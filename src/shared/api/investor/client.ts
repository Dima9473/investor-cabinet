import { API_URL, DEMO_MODE } from 'lib/constants/env';
import { z } from 'zod';

import {
  demoAccounts,
  demoAnalytics,
  demoOperations,
  demoPortfolio,
} from './demo';
import {
  accountsDataSchema,
  analyticsDataSchema,
  envelopeSchema,
  operationsDataSchema,
  portfolioDataSchema,
} from './schemas';

import {
  AccountsData,
  AnalyticsData,
  AnalyticsRequest,
  ApiEnvelope,
  BankName,
  OperationsData,
  OperationsRequest,
  PortfolioData,
} from './types';

export class InvestorApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'InvestorApiError';
    this.status = status;
  }
}

const normalizeBaseUrl = (url: string) => url.replace(/\/$/, '');

const post = async <T>(path: string, body: unknown): Promise<T> => {
  if (!API_URL) {
    throw new InvestorApiError('Адрес сервиса данных не настроен');
  }

  const response = await fetch(`${normalizeBaseUrl(API_URL)}/${path}`, {
    body: JSON.stringify(body),
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });

  if (!response.ok) {
    let message = `Сервис данных ответил с кодом ${response.status}`;
    try {
      const payload = (await response.json()) as {
        error?: { message?: unknown };
      };
      if (typeof payload.error?.message === 'string') {
        message = payload.error.message;
      }
    } catch {
      // Keep the status-based message when the service did not return JSON.
    }

    throw new InvestorApiError(
      message,
      response.status,
    );
  }

  return (await response.json()) as T;
};

const parseEnvelope = <T>(
  schema: z.ZodTypeAny,
  value: unknown,
  label: string,
) => {
  const result = schema.safeParse(value);
  if (!result.success) {
    throw new InvestorApiError(
      `Сервис вернул некорректные данные: ${label}`,
    );
  }

  return result.data as ApiEnvelope<T>;
};

export const investorApi = {
  async accounts(bankName: BankName): Promise<ApiEnvelope<AccountsData>> {
    if (DEMO_MODE) {
      return demoAccounts();
    }

    const response = await post<unknown>(`accounts/${bankName}`, {});
    return parseEnvelope<AccountsData>(
      envelopeSchema(accountsDataSchema),
      response,
      'счета',
    );
  },

  async analytics(
    bankName: BankName,
    request: AnalyticsRequest,
  ): Promise<ApiEnvelope<AnalyticsData>> {
    if (DEMO_MODE) {
      return demoAnalytics(request);
    }

    const response = await post<unknown>(`analytics/${bankName}`, request);
    return parseEnvelope<AnalyticsData>(
      envelopeSchema(analyticsDataSchema),
      response,
      'аналитика',
    );
  },

  async operations(
    bankName: BankName,
    request: OperationsRequest,
  ): Promise<ApiEnvelope<OperationsData>> {
    if (DEMO_MODE) {
      return demoOperations(request);
    }

    const response = await post<unknown>(`operations/${bankName}`, request);
    return parseEnvelope<OperationsData>(
      envelopeSchema(operationsDataSchema),
      response,
      'операции',
    );
  },

  async portfolio(
    bankName: BankName,
    accountId: string,
  ): Promise<ApiEnvelope<PortfolioData>> {
    if (DEMO_MODE) {
      return demoPortfolio(accountId);
    }

    const response = await post<unknown>(`portfolio/${bankName}`, { accountId });
    return parseEnvelope<PortfolioData>(
      envelopeSchema(portfolioDataSchema),
      response,
      'портфель',
    );
  },
};
