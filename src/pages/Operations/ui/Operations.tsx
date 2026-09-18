import { useInvestorLayout } from 'app/ui/MainLayout';
import { useEffect, useMemo, useState } from 'react';

import {
  OperationsRequest,
  OperationType,
  useInvestorOperations,
} from 'shared/api/investor';
import {
  formatCompactMoney,
  formatDateTime,
  moneyFromNano,
  moneyToDecimalString,
  moneyToNano,
} from 'shared/lib/formatInvestor';
import { Card } from 'shared/ui/Card';
import { EmptyState } from 'shared/ui/EmptyState';
import { Icon } from 'shared/ui/Icon';
import { Skeleton } from 'shared/ui/Skeleton';
import { OperationList, OperationsTable } from 'entities/operation/ui';

const toInputDate = (date: Date) => date.toISOString().slice(0, 10);

const defaultFrom = () => {
  const date = new Date();
  date.setDate(1);
  return toInputDate(date);
};

const operationTypeOptions: Array<{ label: string; value: '' | OperationType }> = [
  { label: 'Все операции', value: '' },
  { label: 'Покупки', value: 'buy' },
  { label: 'Продажи', value: 'sell' },
  { label: 'Дивиденды', value: 'dividend' },
  { label: 'Купоны', value: 'coupon' },
  { label: 'Комиссии', value: 'fee' },
  { label: 'Налоги', value: 'tax' },
];

export const Operations = () => {
  const { account, accountId, accountsError, accountsLoading, refetchAccounts } =
    useInvestorLayout();
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(() => toInputDate(new Date()));
  const [type, setType] = useState<'' | OperationType>('');
  const [cursor, setCursor] = useState<string>();
  const [cursorHistory, setCursorHistory] = useState<Array<string | undefined>>([]);

  useEffect(() => {
    setCursor(undefined);
    setCursorHistory([]);
  }, [accountId]);

  const resetPagination = () => {
    setCursor(undefined);
    setCursorHistory([]);
  };
  const request = useMemo<OperationsRequest | undefined>(
    () =>
      accountId
        ? {
            accountId,
            cursor,
            from: from ? `${from}T00:00:00.000Z` : undefined,
            limit: 20,
            to: to ? `${to}T23:59:59.999Z` : undefined,
            types: type ? [type] : undefined,
          }
        : undefined,
    [accountId, cursor, from, to, type],
  );
  const query = useInvestorOperations(request);

  if (accountsLoading || (accountId && query.isPending)) {
    return <Skeleton cards={5} />;
  }

  const error = accountsError ?? query.error;
  if (error) {
    return (
      <Card className="page-state-card">
        <EmptyState
          action={{
            label: 'Повторить',
            onClick: () => {
              refetchAccounts();
              void query.refetch();
            },
          }}
          description={error.message}
          icon="database"
          title="Не удалось загрузить операции"
        />
      </Card>
    );
  }

  const data = query.data?.data;
  if (!account || !data) {
    return (
      <Card className="page-state-card">
        <EmptyState
          description="Выберите доступный брокерский счёт, чтобы посмотреть историю."
          icon="history"
          title="Операции недоступны"
        />
      </Card>
    );
  }

  type CurrencyTotals = Record<string, bigint>;
  const addAmount = (totals: CurrencyTotals, currency: string, amount: bigint) => {
    const key = currency.toLowerCase();
    totals[key] = (totals[key] ?? 0n) + amount;
  };
  const summary = data.items.reduce(
    (result, operation) => {
      const amount = moneyToNano(operation.payment);
      if (operation.type === 'fee') {
        addAmount(
          result.fees,
          operation.payment.currency,
          amount < 0n ? -amount : amount,
        );
      } else if (amount > 0n) {
        addAmount(result.income, operation.payment.currency, amount);
      } else {
        addAmount(
          result.outcome,
          operation.payment.currency,
          amount < 0n ? -amount : amount,
        );
      }
      return result;
    },
    {
      fees: {} as CurrencyTotals,
      income: {} as CurrencyTotals,
      outcome: {} as CurrencyTotals,
    },
  );
  const formatTotals = (totals: CurrencyTotals) => {
    const values = Object.entries(totals);
    if (values.length === 0) {
      return formatCompactMoney(moneyFromNano(0n));
    }

    return values
      .map(([currency, value]) => formatCompactMoney(moneyFromNano(value, currency)))
      .join(' · ');
  };

  const handleExport = () => {
    const rows = [
      ['Дата', 'Тип', 'Инструмент', 'Описание', 'Сумма', 'Валюта'],
      ...data.items.map((operation) => [
        operation.occurredAt,
        operation.type,
        operation.instrumentName ?? '',
        operation.description,
        moneyToDecimalString(operation.payment),
        operation.payment.currency,
      ]),
    ];
    const csv = rows
      .map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(';'),
      )
      .join('\r\n');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(
      new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }),
    );
    link.download = `operations-${from}-${to}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="operations-page">
      <Card className="filters-panel">
        <label className="field-control">
          <span>С</span>
          <input
            max={to}
            onChange={(event) => {
              resetPagination();
              setFrom(event.target.value);
            }}
            type="date"
            value={from}
          />
        </label>
        <label className="field-control">
          <span>По</span>
          <input
            min={from}
            onChange={(event) => {
              resetPagination();
              setTo(event.target.value);
            }}
            type="date"
            value={to}
          />
        </label>
        <label className="field-control field-control--select">
          <span>Тип операции</span>
          <select
            onChange={(event) => {
              resetPagination();
              setType(event.target.value as '' | OperationType);
            }}
            value={type}
          >
            {operationTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Icon name="chevronDown" size={16} />
        </label>
      </Card>

      <section className="kpi-grid kpi-grid--three">
        <Card as="article" className="kpi-card">
          <span>Поступления</span>
          <strong className="value-positive">+{formatTotals(summary.income)}</strong>
          <small>На текущей странице</small>
        </Card>
        <Card as="article" className="kpi-card">
          <span>Списания</span>
          <strong>{formatTotals(summary.outcome)}</strong>
          <small>На текущей странице</small>
        </Card>
        <Card as="article" className="kpi-card">
          <span>Комиссии</span>
          <strong>{formatTotals(summary.fees)}</strong>
          <small>На текущей странице</small>
        </Card>
      </section>

      <Card className="operations-panel">
        <div className="card-heading card-heading--wrap">
          <div>
            <span>Все операции</span>
            <small>
              {data.items.length} операций · обновлено{' '}
              {query.data?.meta.generatedAt
                ? formatDateTime(query.data.meta.generatedAt)
                : 'недавно'}
            </small>
          </div>
          <button
            className="button button--secondary button--compact"
            disabled={data.items.length === 0}
            onClick={handleExport}
            type="button"
          >
            <Icon name="download" size={17} />
            Экспорт CSV
          </button>
        </div>
        {data.items.length > 0 ? (
          <>
            <div className="desktop-only">
              <OperationsTable accountName={account.name} items={data.items} />
            </div>
            <div className="mobile-only">
              <OperationList items={data.items} />
            </div>
          </>
        ) : (
          <EmptyState
            description="Попробуйте изменить период или тип операции."
            icon="filter"
            title="Ничего не найдено"
          />
        )}
        <div className="pagination-row">
          <span>{data.items.length} на странице</span>
          <button
            aria-label="Предыдущая страница"
            className="icon-button"
            disabled={!cursor}
            onClick={() => {
              const previous = cursorHistory.at(-1);
              setCursor(previous);
              setCursorHistory((history) => history.slice(0, -1));
            }}
            type="button"
          >
            <Icon name="chevronLeft" />
          </button>
          <button
            aria-label="Следующая страница"
            className="icon-button"
            disabled={!data.hasNext || !data.nextCursor}
            onClick={() => {
              setCursorHistory((history) => [...history, cursor]);
              setCursor(data.nextCursor ?? undefined);
            }}
            type="button"
          >
            <Icon name="chevronRight" />
          </button>
        </div>
      </Card>
    </div>
  );
};
