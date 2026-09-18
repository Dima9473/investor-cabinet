import { useInvestorLayout } from 'app/ui/MainLayout';
import { useMemo, useState } from 'react';

import { useInvestorAnalytics } from 'shared/api/investor';
import {
  formatCompactMoney,
  formatPercent,
  moneyToApproximateNumber,
} from 'shared/lib/formatInvestor';
import { Card } from 'shared/ui/Card';
import { EmptyState } from 'shared/ui/EmptyState';
import { Icon } from 'shared/ui/Icon';
import { Skeleton } from 'shared/ui/Skeleton';
import { PortfolioChart } from 'widgets/PortfolioChart';

type Period = '1m' | '6m' | '1y';

const periodDays: Record<Period, number> = {
  '1m': 30,
  '1y': 365,
  '6m': 183,
};

const monthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

const instrumentKindLabels = {
  bond: 'Облигации',
  currency: 'Деньги и валюта',
  etf: 'Фонды',
  future: 'Фьючерсы',
  other: 'Прочее',
  share: 'Акции',
} as const;

export const Analytics = () => {
  const { accountId, accountsError, accountsLoading, refetchAccounts } =
    useInvestorLayout();
  const [period, setPeriod] = useState<Period>('1m');
  const request = useMemo(() => {
    if (!accountId) {
      return undefined;
    }

    const to = new Date();
    const from = new Date(to);
    from.setDate(from.getDate() - periodDays[period]);

    return {
      accountId,
      from: from.toISOString(),
      interval: period === '1m' ? ('day' as const) : ('week' as const),
      to: to.toISOString(),
    };
  }, [accountId, period]);
  const query = useInvestorAnalytics(request);

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
          title="Не удалось построить аналитику"
        />
      </Card>
    );
  }

  const data = query.data?.data;
  if (!data) {
    return (
      <Card className="page-state-card">
        <EmptyState
          description="Для расчёта нужны позиции, операции и история котировок."
          icon="analytics"
          title="Недостаточно данных"
        />
      </Card>
    );
  }

  const latest = data.performance.at(-1);
  const performanceAvailable = data.quality.methodology !== 'unavailable';
  let qualityText = 'Точная историческая доходность пока недоступна.';
  if (data.quality.estimated && performanceAvailable) {
    qualityText = `Доходность оценочная. Покрытие инструментов — ${formatPercent(data.quality.coveragePercent)}.`;
  }
  if (data.quality.warnings.length > 0) {
    qualityText += ` ${data.quality.warnings.join(' ')}`;
  }
  const maxIncome = Math.max(
    ...data.income.map(
      (item) =>
        moneyToApproximateNumber(item.dividends) +
        moneyToApproximateNumber(item.coupons),
    ),
    1,
  );

  return (
    <div className="analytics-page">
      <Card className="analytics-chart-card">
        <div className="card-heading card-heading--wrap">
          <div>
            <span>Доходность портфеля</span>
            <small>Оценка текущего состава по историческим котировкам</small>
          </div>
          <div aria-label="Период аналитики" className="segmented-control" role="group">
            {(
              [
                ['1m', '1М'],
                ['6m', '6М'],
                ['1y', '1Г'],
              ] as Array<[Period, string]>
            ).map(([value, label]) => (
              <button
                aria-pressed={period === value}
                className={period === value ? 'is-selected' : undefined}
                key={value}
                onClick={() => setPeriod(value)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="chart-summary">
          <strong>{formatCompactMoney(latest?.absoluteReturn)}</strong>
          <span className="trend-badge">
            {formatPercent(latest?.returnPercent, true)}
          </span>
        </div>
        {performanceAvailable && data.performance.length > 1 ? (
          <PortfolioChart points={data.performance} />
        ) : (
          <EmptyState
            description="Для графика нужно как минимум две оценки портфеля."
            icon="analytics"
            title="Мало исторических данных"
          />
        )}
        <div className="data-quality-note">
          <Icon name="info" size={16} />
          <span>{qualityText}</span>
        </div>
      </Card>

      <Card className="risk-card">
        <div className="card-heading">
          <div>
            <span>Показатели риска</span>
            <small>По доступной истории</small>
          </div>
          <Icon name="shield" />
        </div>
        <dl className="risk-list">
          <div>
            <dt>Волатильность</dt>
            <dd>{formatPercent(data.risk.volatilityPercent)}</dd>
          </div>
          <div>
            <dt>Макс. просадка</dt>
            <dd>{formatPercent(data.risk.maxDrawdownPercent)}</dd>
          </div>
          <div>
            <dt>Диверсификация</dt>
            <dd>
              {data.risk.diversificationScore === null
                ? 'Нет данных'
                : `${data.risk.diversificationScore} / 100`}
            </dd>
          </div>
          <div>
            <dt>Крупнейшая позиция</dt>
            <dd>{formatPercent(data.risk.largestPositionPercent)}</dd>
          </div>
        </dl>
      </Card>

      <Card className="income-card">
        <div className="card-heading">
          <div>
            <span>Доход по месяцам</span>
            <small>Дивиденды и купоны</small>
          </div>
        </div>
        {data.income.length > 0 ? (
          <div className="income-bars" role="img" aria-label="Выплаты по месяцам">
            {data.income.map((item) => {
              const value =
                moneyToApproximateNumber(item.dividends) +
                moneyToApproximateNumber(item.coupons);
              const month = Number(item.period.split('-')[1]) - 1;
              return (
                <span key={item.period}>
                  <b style={{ height: `${Math.max((value / maxIncome) * 100, 5)}%` }} />
                  <i>{monthNames[month] ?? item.period}</i>
                  <small>{Math.round(value / 1000)}к</small>
                </span>
              );
            })}
          </div>
        ) : (
          <EmptyState
            description="За этот период дивиденды и купоны не поступали."
            icon="calendar"
            title="Выплат пока нет"
          />
        )}
      </Card>

      <Card className="contribution-card">
        <div className="card-heading">
          <div>
            <span>Вклад в результат</span>
            <small>По классам активов</small>
          </div>
        </div>
        {data.contribution.length > 0 ? (
          <ul className="contribution-list">
            {data.contribution.map((item) => (
              <li key={item.kind}>
                <i className={`asset-dot asset-dot--${item.kind}`} />
                <span>{instrumentKindLabels[item.kind]}</span>
                <strong>{formatCompactMoney(item.amount)}</strong>
                <em>{formatPercent(item.percent)}</em>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            description="Расчёт станет доступен после загрузки котировок."
            icon="analytics"
            title="Нет распределения"
          />
        )}
      </Card>
    </div>
  );
};
