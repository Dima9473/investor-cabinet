import { useInvestorLayout } from 'app/ui/MainLayout';
import { Link } from 'react-router';

import {
  useInvestorAnalytics,
  useInvestorOperations,
  useInvestorPortfolio,
} from 'shared/api/investor';
import {
  ANALYTICS_ROUTE,
  OPERATIONS_ROUTE,
  PORTFOLIO_ROUTE,
} from 'shared/lib/const/routes/fullPaths';
import {
  formatCompactMoney,
  formatDateTime,
  formatPercent,
} from 'shared/lib/formatInvestor';
import { Card } from 'shared/ui/Card';
import { EmptyState } from 'shared/ui/EmptyState';
import { Icon } from 'shared/ui/Icon';
import { MetricCard } from 'shared/ui/MetricCard';
import { Skeleton } from 'shared/ui/Skeleton';
import { OperationList } from 'entities/operation/ui';
import { AllocationChart } from 'widgets/AllocationChart';
import { PortfolioChart } from 'widgets/PortfolioChart';

export const Overview = () => {
  const {
    account,
    accountId,
    accountsError,
    accountsLoading,
    refetchAccounts,
  } = useInvestorLayout();
  const portfolio = useInvestorPortfolio(accountId);
  const operations = useInvestorOperations(
    accountId ? { accountId, limit: 5 } : undefined,
  );
  const analytics = useInvestorAnalytics(
    accountId ? { accountId, interval: 'day' } : undefined,
  );

  const isLoading =
    accountsLoading ||
    (Boolean(accountId) &&
      (portfolio.isPending || operations.isPending || analytics.isPending));
  const error = accountsError ?? portfolio.error ?? operations.error ?? analytics.error;

  if (error) {
    return (
      <Card className="page-state-card">
        <EmptyState
          action={{
            label: 'Повторить',
            onClick: () => {
              refetchAccounts();
              void portfolio.refetch();
              void operations.refetch();
              void analytics.refetch();
            },
          }}
          description={error.message}
          icon="database"
          title="Не удалось загрузить обзор"
        />
      </Card>
    );
  }

  if (isLoading) {
    return <Skeleton cards={6} />;
  }

  const portfolioData = portfolio.data?.data;
  const operationsData = operations.data?.data;
  const analyticsData = analytics.data?.data;

  if (!account || !portfolioData) {
    return (
      <Card className="page-state-card">
        <EmptyState
          description="Когда в T‑Банке появится открытый брокерский счёт, здесь будет сводка портфеля."
          icon="portfolio"
          title="Нет доступных счетов"
        />
      </Card>
    );
  }

  const latestPoint = analyticsData?.performance.at(-1);
  const recentOperations = operationsData?.items.slice(0, 4) ?? [];

  return (
    <div className="dashboard-grid">
      <Card className="hero-card">
        <div className="card-heading">
          <div>
            <span>Стоимость портфеля</span>
            <strong>{formatCompactMoney(portfolioData.totalValue)}</strong>
          </div>
          <span className="trend-badge">
            <Icon name="trendUp" size={16} />
            {formatPercent(portfolioData.expectedYieldPercent, true)}
          </span>
        </div>
        {analyticsData?.performance.length ? (
          <PortfolioChart points={analyticsData.performance} />
        ) : (
          <div className="chart-placeholder">Недостаточно данных для графика</div>
        )}
        <div className="hero-card__footer">
          <span>
            Результат за период{analyticsData?.quality.estimated ? ' · оценка' : ''}
          </span>
          <strong>{formatCompactMoney(latestPoint?.absoluteReturn)}</strong>
        </div>
      </Card>

      <Card className="result-card">
        <div className="card-heading">
          <div>
            <span>Результат</span>
            <small>За всё время</small>
          </div>
          <Icon name="analytics" />
        </div>
        <div
          aria-label={`Доходность ${formatPercent(portfolioData.expectedYieldPercent)}`}
          className="result-ring"
          role="img"
          style={{ '--ring-progress': `${Math.min(Math.max(portfolioData.expectedYieldPercent * 3, 0), 100)}%` } as React.CSSProperties}
        >
          <span>
            <strong>{formatPercent(portfolioData.expectedYieldPercent, true)}</strong>
            <small>доходность</small>
          </span>
        </div>
        <span className="value-positive">
          {formatCompactMoney(portfolioData.expectedYield)}
        </span>
      </Card>

      <Card className="cash-card">
        <div className="card-heading">
          <div>
            <span>Свободные средства</span>
            <small>{account.name}</small>
          </div>
          <Icon name="wallet" />
        </div>
        <dl className="cash-list">
          {portfolioData.availableCash.map((item) => (
            <div key={item.currency}>
              <dt>{item.currency.toUpperCase()}</dt>
              <dd>{formatCompactMoney(item)}</dd>
            </div>
          ))}
          <div>
            <dt>Заблокировано</dt>
            <dd>{formatCompactMoney(portfolioData.blockedCash[0])}</dd>
          </div>
        </dl>
      </Card>

      <div className="metric-grid dashboard-grid__metrics">
        <MetricCard
          accent="blue"
          caption="Последний период с выплатами"
          icon="trendUp"
          label="Дивиденды"
          value={formatCompactMoney(analyticsData?.income.at(-1)?.dividends)}
        />
        <MetricCard
          accent="purple"
          caption="Последний период с выплатами"
          icon="calendar"
          label="Купоны"
          value={formatCompactMoney(analyticsData?.income.at(-1)?.coupons)}
        />
        <MetricCard
          accent="orange"
          caption={`${portfolioData.positions.length} инструментов`}
          icon="briefcase"
          label="Позиции"
          value={portfolioData.positions.length}
        />
      </div>

      <Card className="activity-card">
        <div className="card-heading">
          <div>
            <span>Динамика портфеля</span>
            <small>Последние наблюдения</small>
          </div>
          <Link className="text-link" to={ANALYTICS_ROUTE}>
            Подробнее <Icon name="arrowRight" size={16} />
          </Link>
        </div>
        <div className="mini-bars" role="img" aria-label="Динамика портфеля по дням">
          {(analyticsData?.performance ?? []).slice(-7).map((point, index) => (
            <span
              key={point.at}
              style={{ height: `${35 + index * 8}%` }}
              title={formatDateTime(point.at)}
            />
          ))}
        </div>
      </Card>

      <Card className="allocation-card">
        <div className="card-heading">
          <div>
            <span>Структура</span>
            <small>По классам активов</small>
          </div>
          <Link className="icon-link" to={PORTFOLIO_ROUTE} aria-label="Открыть портфель">
            <Icon name="arrowRight" size={18} />
          </Link>
        </div>
        <AllocationChart items={portfolioData.allocation} />
      </Card>

      <Card className="operations-card">
        <div className="card-heading">
          <div>
            <span>Последние операции</span>
            <small>
              {operations.data?.meta.generatedAt
                ? `Обновлено ${formatDateTime(operations.data.meta.generatedAt)}`
                : account.name}
            </small>
          </div>
          <Link className="text-link" to={OPERATIONS_ROUTE}>
            Все операции <Icon name="arrowRight" size={16} />
          </Link>
        </div>
        {recentOperations.length > 0 ? (
          <OperationList compact items={recentOperations} />
        ) : (
          <EmptyState
            description="За выбранный период по счёту не было движений."
            icon="history"
            title="Операций пока нет"
          />
        )}
      </Card>
    </div>
  );
};
