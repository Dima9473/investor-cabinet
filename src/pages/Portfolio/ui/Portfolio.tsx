import { useInvestorLayout } from 'app/ui/MainLayout';
import { useMemo, useState } from 'react';

import { InstrumentKind, useInvestorPortfolio } from 'shared/api/investor';
import { formatCompactMoney, formatPercent } from 'shared/lib/formatInvestor';
import { Card } from 'shared/ui/Card';
import { EmptyState } from 'shared/ui/EmptyState';
import { Icon } from 'shared/ui/Icon';
import { Skeleton } from 'shared/ui/Skeleton';
import { PositionList, PositionsTable } from 'entities/portfolio/ui';
import { AllocationChart } from 'widgets/AllocationChart';

type PositionFilter = 'all' | InstrumentKind;

export const Portfolio = () => {
  const { account, accountId, accountsError, accountsLoading, refetchAccounts } =
    useInvestorLayout();
  const query = useInvestorPortfolio(accountId);
  const [filter, setFilter] = useState<PositionFilter>('all');
  const [sortDescending, setSortDescending] = useState(true);

  const positions = useMemo(() => {
    const source = query.data?.data.positions ?? [];
    const filtered =
      filter === 'all'
        ? source
        : source.filter((position) => position.instrumentType === filter);

    return [...filtered].sort((first, second) => {
      const difference = first.expectedYieldPercent - second.expectedYieldPercent;
      return sortDescending ? -difference : difference;
    });
  }, [filter, query.data?.data.positions, sortDescending]);

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
          title="Не удалось загрузить портфель"
        />
      </Card>
    );
  }

  const data = query.data?.data;
  if (!account || !data) {
    return (
      <Card className="page-state-card">
        <EmptyState
          description="Подключённые брокерские счета появятся здесь автоматически."
          icon="portfolio"
          title="Портфель пока пуст"
        />
      </Card>
    );
  }

  return (
    <div className="portfolio-page">
      <section className="kpi-grid">
        <Card as="article" className="kpi-card">
          <span>Стоимость</span>
          <strong>{formatCompactMoney(data.totalValue)}</strong>
          <small className="value-positive">
            {formatPercent(data.expectedYieldPercent, true)} за всё время
          </small>
        </Card>
        <Card as="article" className="kpi-card">
          <span>Результат</span>
          <strong className="value-positive">{formatCompactMoney(data.expectedYield)}</strong>
          <small>По открытым позициям</small>
        </Card>
        <Card as="article" className="kpi-card">
          <span>Свободные средства</span>
          <strong>{formatCompactMoney(data.availableCash[0])}</strong>
          <small>На счёте {account.name}</small>
        </Card>
        <Card as="article" className="kpi-card">
          <span>Позиций</span>
          <strong>{data.positions.length}</strong>
          <small>{data.allocation.length} класса активов</small>
        </Card>
      </section>

      <Card className="positions-panel">
        <div className="card-heading card-heading--wrap">
          <div>
            <span>Позиции</span>
            <small>
              {account.name} · данные на{' '}
              {data.asOf
                ? new Date(data.asOf).toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '—'}
            </small>
          </div>
          <div className="table-controls">
            <label className="select-control select-control--compact">
              <span className="visually-hidden">Класс актива</span>
              <select
                onChange={(event) => setFilter(event.target.value as PositionFilter)}
                value={filter}
              >
                <option value="all">Все активы</option>
                <option value="share">Акции</option>
                <option value="bond">Облигации</option>
                <option value="etf">Фонды</option>
                <option value="currency">Валюта</option>
              </select>
              <Icon name="chevronDown" size={16} />
            </label>
            <button
              className="button button--secondary button--compact"
              onClick={() => setSortDescending((value) => !value)}
              type="button"
            >
              <Icon name="analytics" size={17} />
              Доходность {sortDescending ? '↓' : '↑'}
            </button>
          </div>
        </div>
        {positions.length > 0 ? (
          <>
            <div className="desktop-only">
              <PositionsTable positions={positions} />
            </div>
            <div className="mobile-only">
              <PositionList positions={positions} />
            </div>
          </>
        ) : (
          <EmptyState
            description="Измените фильтр, чтобы увидеть другие активы."
            icon="filter"
            title="Нет позиций этого типа"
          />
        )}
      </Card>

      <Card className="accounts-panel">
        <div className="card-heading">
          <div>
            <span>Выбранный счёт</span>
            <small>Источник данных · T‑Банк</small>
          </div>
          <Icon name="landmark" />
        </div>
        <div className="account-summary">
          <span className="account-summary__icon">
            <Icon name={account.type === 'iis' ? 'shield' : 'briefcase'} />
          </span>
          <span>
            <strong>{account.name}</strong>
            <small>{account.type === 'iis' ? 'Индивидуальный инвестиционный' : 'Брокерский'}</small>
          </span>
          <b>{formatCompactMoney(data.totalValue)}</b>
        </div>
        <AllocationChart items={data.allocation} />
      </Card>
    </div>
  );
};
