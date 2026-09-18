import {
  AccountsData,
  AnalyticsData,
  AnalyticsRequest,
  ApiEnvelope,
  Money,
  OperationsData,
  OperationsRequest,
  PortfolioData,
} from './types';

const demoAccountIds = new Set(['main-broker-account', 'iis-account']);

const assertDemoAccount = (accountId: string) => {
  if (!demoAccountIds.has(accountId)) {
    throw new Error('Демо-счёт не найден');
  }
};

const money = (units: string, currency = 'rub', nano = 0): Money => ({
  currency,
  nano,
  units,
});

const meta = () => ({
  generatedAt: new Date().toISOString(),
  source: 'demo' as const,
});

export const demoAccounts = (): ApiEnvelope<AccountsData> => ({
  data: {
    accounts: [
      {
        id: 'main-broker-account',
        name: 'Основной счёт',
        openedAt: '2022-03-18T00:00:00.000Z',
        status: 'open',
        type: 'broker',
      },
      {
        id: 'iis-account',
        name: 'ИИС',
        openedAt: '2023-11-02T00:00:00.000Z',
        status: 'open',
        type: 'iis',
      },
    ],
  },
  meta: meta(),
});

const positions: PortfolioData['positions'] = [
  {
    averagePrice: money('5847'),
    currentPrice: money('6924'),
    expectedYield: money('25848'),
    expectedYieldPercent: 18.42,
    figi: 'BBG004731032',
    instrumentType: 'share',
    instrumentUid: 'lukoyl-uid',
    name: 'Лукойл',
    quantity: '24',
    ticker: 'LKOH',
    value: money('166176'),
  },
  {
    averagePrice: money('281'),
    currentPrice: money('317', 'rub', 700_000_000),
    expectedYield: money('15781'),
    expectedYieldPercent: 12.69,
    figi: 'BBG004730N88',
    instrumentType: 'share',
    instrumentUid: 'sber-uid',
    name: 'Сбербанк',
    quantity: '430',
    ticker: 'SBER',
    value: money('136611'),
  },
  {
    averagePrice: money('4272'),
    currentPrice: money('4182'),
    expectedYield: money('-1620'),
    expectedYieldPercent: -2.11,
    figi: 'TCS00A107T19',
    instrumentType: 'share',
    instrumentUid: 'yandex-uid',
    name: 'Яндекс',
    quantity: '18',
    ticker: 'YDEX',
    value: money('75276'),
  },
  {
    averagePrice: money('896', 'rub', 500_000_000),
    currentPrice: money('957', 'rub', 400_000_000),
    expectedYield: money('15834'),
    expectedYieldPercent: 6.79,
    figi: 'BBG00RRT3TX4',
    instrumentType: 'bond',
    instrumentUid: 'ofz-26238-uid',
    name: 'ОФЗ 26238',
    quantity: '260',
    ticker: 'SU26238RMFS4',
    value: money('248924'),
  },
  {
    averagePrice: money('713'),
    currentPrice: money('756', 'rub', 800_000_000),
    expectedYield: money('8640'),
    expectedYieldPercent: 6.04,
    figi: 'BBG004RVFCY3',
    instrumentType: 'share',
    instrumentUid: 'tatneft-uid',
    name: 'Татнефть',
    quantity: '200',
    ticker: 'TATN',
    value: money('151360'),
  },
  {
    averagePrice: money('100'),
    currentPrice: money('102', 'rub', 810_000_000),
    expectedYield: money('6740'),
    expectedYieldPercent: 2.81,
    instrumentType: 'etf',
    instrumentUid: 'tmof-uid',
    name: 'Т‑Капитал IMOEX',
    quantity: '2400',
    ticker: 'TMOS',
    value: money('246744'),
  },
];

export const demoPortfolio = (accountId: string): ApiEnvelope<PortfolioData> => {
  assertDemoAccount(accountId);
  return {
    data: {
      accountId,
      allocation: [
        { kind: 'share', percent: 60, value: money('770712') },
        { kind: 'bond', percent: 25, value: money('321130') },
        { kind: 'currency', percent: 15, value: money('192678') },
      ],
      asOf: new Date().toISOString(),
      availableCash: [
        money('182430', 'rub', 200_000_000),
        money('1240', 'usd'),
      ],
      blockedCash: [money('8200')],
      baseCurrency: 'rub',
      expectedYield: money('214380'),
      expectedYieldPercent: 20.02,
      positions,
      totalValue: money('1284520', 'rub', 540_000_000),
    },
    meta: meta(),
  };
};

const operationItems: OperationsData['items'] = [
  {
    description: 'Покупка облигаций',
    figi: 'BBG00RRT3TX4',
    id: 'operation-1',
    instrumentName: 'ОФЗ 26238',
    instrumentUid: 'ofz-26238-uid',
    occurredAt: '2026-09-18T12:40:00.000Z',
    payment: money('-24682', 'rub', -400_000_000),
    price: money('949', 'rub', 320_000_000),
    quantity: '26',
    status: 'done',
    ticker: 'SU26238RMFS4',
    type: 'buy',
  },
  {
    description: 'Выплата дивидендов',
    id: 'operation-2',
    instrumentName: 'Лукойл',
    instrumentUid: 'lukoyl-uid',
    occurredAt: '2026-09-17T10:12:00.000Z',
    payment: money('4980'),
    status: 'done',
    ticker: 'LKOH',
    type: 'dividend',
  },
  {
    description: 'Комиссия брокера',
    id: 'operation-3',
    occurredAt: '2026-09-17T09:58:00.000Z',
    payment: money('-86', 'rub', -400_000_000),
    status: 'done',
    type: 'fee',
  },
  {
    description: 'Выплата купона',
    id: 'operation-4',
    instrumentName: 'ОФЗ 26238',
    instrumentUid: 'ofz-26238-uid',
    occurredAt: '2026-09-12T11:30:00.000Z',
    payment: money('3930'),
    status: 'done',
    ticker: 'SU26238RMFS4',
    type: 'coupon',
  },
  {
    description: 'Покупка акций',
    id: 'operation-5',
    instrumentName: 'Сбербанк',
    instrumentUid: 'sber-uid',
    occurredAt: '2026-09-09T15:18:00.000Z',
    payment: money('-31770'),
    price: money('317', 'rub', 700_000_000),
    quantity: '100',
    status: 'done',
    ticker: 'SBER',
    type: 'buy',
  },
  {
    description: 'Налог с дивидендов',
    id: 'operation-6',
    instrumentName: 'Лукойл',
    occurredAt: '2026-09-08T10:12:00.000Z',
    payment: money('-647', 'rub', -400_000_000),
    status: 'done',
    ticker: 'LKOH',
    type: 'tax',
  },
];

export const demoOperations = (
  request: OperationsRequest,
): ApiEnvelope<OperationsData> => {
  assertDemoAccount(request.accountId);
  const byType = request.types?.length
    ? operationItems.filter((item) => request.types?.includes(item.type))
    : operationItems;
  const from = request.from ? new Date(request.from).getTime() : Number.NEGATIVE_INFINITY;
  const to = request.to ? new Date(request.to).getTime() : Number.POSITIVE_INFINITY;
  const filtered = byType.filter((item) => {
    const occurredAt = new Date(item.occurredAt).getTime();
    return occurredAt >= from && occurredAt <= to;
  });
  const offset = request.cursor ? Number(request.cursor) : 0;
  const limit = Math.min(Math.max(request.limit ?? 20, 1), 100);
  const items = filtered.slice(offset, offset + limit);
  const nextOffset = offset + items.length;

  return {
    data: {
      accountId: request.accountId,
      hasNext: nextOffset < filtered.length,
      items,
      nextCursor: nextOffset < filtered.length ? String(nextOffset) : null,
    },
    meta: meta(),
  };
};

const values = [
  1_168_400, 1_176_200, 1_171_840, 1_191_620, 1_204_100, 1_198_440,
  1_224_860, 1_238_300, 1_231_740, 1_252_680, 1_264_300, 1_284_520,
];

export const demoAnalytics = (
  request: AnalyticsRequest,
): ApiEnvelope<AnalyticsData> => {
  assertDemoAccount(request.accountId);
  const from = request.from ? new Date(request.from).getTime() : Number.NEGATIVE_INFINITY;
  const to = request.to ? new Date(request.to).getTime() : Number.POSITIVE_INFINITY;
  const performance = values
    .map((value, index) => ({
      absoluteReturn: money(String(value - values[0])),
      at: new Date(Date.UTC(2026, 8, 7 + index)).toISOString(),
      returnPercent: ((value - values[0]) / values[0]) * 100,
      value: money(String(value)),
    }))
    .filter((point) => {
      const at = new Date(point.at).getTime();
      return at >= from && at <= to;
    });

  return {
    data: {
      accountId: request.accountId,
      asOf: new Date().toISOString(),
      baseCurrency: 'rub',
    contribution: [
      { amount: money('62480'), kind: 'share', percent: 74 },
      { amount: money('15920'), kind: 'bond', percent: 19 },
      { amount: money('5920'), kind: 'currency', percent: 7 },
    ],
    income: [
      { coupons: money('2100'), dividends: money('2100'), period: '2026-04' },
      { coupons: money('3500'), dividends: money('6600'), period: '2026-05' },
      { coupons: money('3400'), dividends: money('2900'), period: '2026-06' },
      { coupons: money('4800'), dividends: money('9600'), period: '2026-07' },
      { coupons: money('3100'), dividends: money('4900'), period: '2026-08' },
      { coupons: money('3930'), dividends: money('7970'), period: '2026-09' },
    ],
      performance,
    quality: {
      coveragePercent: 100,
      estimated: true,
      methodology: 'current-holdings-backcast',
      warnings: ['Результат не учитывает изменение количества позиций внутри периода.'],
    },
    risk: {
      diversificationScore: 82,
      largestPositionPercent: 18.1,
      maxDrawdownPercent: 8.4,
      volatilityPercent: 14.8,
    },
    },
    meta: meta(),
  };
};
