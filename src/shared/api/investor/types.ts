export type BankName = 't-bank';

export type Money = {
  currency: string;
  nano: number;
  units: string;
};

export type ApiMeta = {
  generatedAt: string;
  source: BankName | 'demo';
};

export type ApiEnvelope<T> = {
  data: T;
  meta: ApiMeta;
};

export type AccountType = 'broker' | 'iis' | 'invest-box' | 'unknown';
export type AccountStatus = 'open' | 'closed' | 'unknown';

export type InvestorAccount = {
  closedAt?: string;
  id: string;
  name: string;
  openedAt?: string;
  providerStatus?: string;
  providerType?: string;
  status: AccountStatus;
  type: AccountType;
};

export type AccountsData = {
  accounts: InvestorAccount[];
};

export type InstrumentKind =
  | 'share'
  | 'bond'
  | 'etf'
  | 'currency'
  | 'future'
  | 'other';

export type PortfolioPosition = {
  averagePrice?: Money;
  currentPrice: Money;
  expectedYield: Money;
  expectedYieldPercent: number;
  figi?: string;
  instrumentType: InstrumentKind;
  instrumentUid: string;
  name: string;
  providerInstrumentType?: string;
  quantity: string;
  ticker: string;
  value: Money;
};

export type AllocationItem = {
  kind: InstrumentKind;
  percent: number;
  value: Money;
};

export type PortfolioData = {
  accountId: string;
  allocation: AllocationItem[];
  asOf: string;
  availableCash: Money[];
  baseCurrency: string;
  blockedCash: Money[];
  expectedYield: Money;
  expectedYieldPercent: number;
  positions: PortfolioPosition[];
  totalValue: Money;
};

export type OperationType =
  | 'buy'
  | 'sell'
  | 'dividend'
  | 'coupon'
  | 'fee'
  | 'tax'
  | 'deposit'
  | 'withdraw'
  | 'other'
  | 'unknown';

export type OperationStatus = 'done' | 'pending' | 'cancelled' | 'unknown';

export type InvestorOperation = {
  description: string;
  figi?: string;
  id: string;
  instrumentName?: string;
  instrumentUid?: string;
  occurredAt: string;
  payment: Money;
  price?: Money;
  providerState?: string;
  providerType?: string;
  quantity?: string;
  status: OperationStatus;
  ticker?: string;
  type: OperationType;
};

export type OperationsData = {
  accountId: string;
  hasNext: boolean;
  items: InvestorOperation[];
  nextCursor: string | null;
};

export type OperationsRequest = {
  accountId: string;
  cursor?: string;
  from?: string;
  limit?: number;
  to?: string;
  types?: OperationType[];
};

export type PerformancePoint = {
  absoluteReturn: Money;
  at: string;
  returnPercent: number;
  value: Money;
};

export type IncomePoint = {
  coupons: Money;
  dividends: Money;
  period: string;
};

export type AnalyticsData = {
  accountId: string;
  asOf: string;
  baseCurrency: string;
  contribution: Array<{
    amount: Money;
    kind: InstrumentKind;
    percent: number;
  }>;
  income: IncomePoint[];
  performance: PerformancePoint[];
  quality: {
    coveragePercent: number;
    estimated: boolean;
    methodology: 'current-holdings-backcast' | 'unavailable';
    warnings: string[];
  };
  risk: {
    diversificationScore: number | null;
    largestPositionPercent: number | null;
    maxDrawdownPercent: number | null;
    volatilityPercent: number | null;
  };
};

export type AnalyticsRequest = {
  accountId: string;
  from?: string;
  interval?: 'day' | 'week' | 'month';
  to?: string;
};
