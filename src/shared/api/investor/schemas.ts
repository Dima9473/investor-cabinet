import { z } from 'zod';

import {
  AccountStatus,
  AccountType,
  InstrumentKind,
  OperationStatus,
  OperationType,
} from './types';

const enumFallback = <T extends string>(values: readonly T[], fallback: T) => {
  const allowed = new Set<string>(values);
  return z.string().transform((value): T => (allowed.has(value) ? (value as T) : fallback));
};

const accountTypeSchema = enumFallback<AccountType>(
  ['broker', 'iis', 'invest-box', 'unknown'],
  'unknown',
);
const accountStatusSchema = enumFallback<AccountStatus>(
  ['open', 'closed', 'unknown'],
  'unknown',
);
const instrumentKindSchema = enumFallback<InstrumentKind>(
  ['share', 'bond', 'etf', 'currency', 'future', 'other'],
  'other',
);
const operationTypeSchema = enumFallback<OperationType>(
  [
    'buy',
    'sell',
    'dividend',
    'coupon',
    'fee',
    'tax',
    'deposit',
    'withdraw',
    'other',
    'unknown',
  ],
  'unknown',
);
const operationStatusSchema = enumFallback<OperationStatus>(
  ['done', 'pending', 'cancelled', 'unknown'],
  'unknown',
);

export const moneySchema = z.object({
  currency: z.string().trim().min(1).max(12).transform((value) => value.toLowerCase()),
  nano: z.number().int().min(-999_999_999).max(999_999_999),
  units: z.string().regex(/^-?\d+$/),
});

export const metaSchema = z.object({
  generatedAt: z.string().datetime({ offset: true }),
  source: z.enum(['t-bank', 'demo']),
});

export const accountsDataSchema = z.object({
  accounts: z.array(
    z.object({
      closedAt: z.string().datetime({ offset: true }).optional(),
      id: z.string().trim().min(1),
      name: z.string().trim().min(1),
      openedAt: z.string().datetime({ offset: true }).optional(),
      providerStatus: z.string().optional(),
      providerType: z.string().optional(),
      status: accountStatusSchema,
      type: accountTypeSchema,
    }),
  ),
});

const positionSchema = z.object({
  averagePrice: moneySchema.optional(),
  currentPrice: moneySchema,
  expectedYield: moneySchema,
  expectedYieldPercent: z.number().finite(),
  figi: z.string().trim().min(1).optional(),
  instrumentType: instrumentKindSchema,
  instrumentUid: z.string().trim().min(1),
  name: z.string().trim().min(1),
  providerInstrumentType: z.string().optional(),
  quantity: z.string().trim().min(1),
  ticker: z.string().trim().min(1),
  value: moneySchema,
});

export const portfolioDataSchema = z.object({
  accountId: z.string().trim().min(1),
  allocation: z.array(
    z.object({
      kind: instrumentKindSchema,
      percent: z.number().finite(),
      value: moneySchema,
    }),
  ),
  asOf: z.string().datetime({ offset: true }),
  availableCash: z.array(moneySchema),
  baseCurrency: z.string().trim().min(1),
  blockedCash: z.array(moneySchema),
  expectedYield: moneySchema,
  expectedYieldPercent: z.number().finite(),
  positions: z.array(positionSchema),
  totalValue: moneySchema,
});

const operationSchema = z.object({
  description: z.string(),
  figi: z.string().trim().min(1).optional(),
  id: z.string().trim().min(1),
  instrumentName: z.string().optional(),
  instrumentUid: z.string().trim().min(1).optional(),
  occurredAt: z.string().datetime({ offset: true }),
  payment: moneySchema,
  price: moneySchema.optional(),
  providerState: z.string().optional(),
  providerType: z.string().optional(),
  quantity: z.string().optional(),
  status: operationStatusSchema,
  ticker: z.string().optional(),
  type: operationTypeSchema,
});

export const operationsDataSchema = z.object({
  accountId: z.string().trim().min(1),
  hasNext: z.boolean(),
  items: z.array(operationSchema),
  nextCursor: z.string().nullable(),
});

const performancePointSchema = z.object({
  absoluteReturn: moneySchema,
  at: z.string().datetime({ offset: true }),
  returnPercent: z.number().finite(),
  value: moneySchema,
});

export const analyticsDataSchema = z.object({
  accountId: z.string().trim().min(1),
  asOf: z.string().datetime({ offset: true }),
  baseCurrency: z.string().trim().min(1),
  contribution: z.array(
    z.object({
      amount: moneySchema,
      kind: instrumentKindSchema,
      percent: z.number().finite(),
    }),
  ),
  income: z.array(
    z.object({
      coupons: moneySchema,
      dividends: moneySchema,
      period: z.string().trim().min(1),
    }),
  ),
  performance: z.array(performancePointSchema),
  quality: z.object({
    coveragePercent: z.number().finite(),
    estimated: z.boolean(),
    methodology: z.enum(['current-holdings-backcast', 'unavailable']),
    warnings: z.array(z.string()),
  }),
  risk: z.object({
    diversificationScore: z.number().finite().nullable(),
    largestPositionPercent: z.number().finite().nullable(),
    maxDrawdownPercent: z.number().finite().nullable(),
    volatilityPercent: z.number().finite().nullable(),
  }),
});

export const envelopeSchema = <T extends z.ZodTypeAny>(data: T) =>
  z.object({ data, meta: metaSchema });
