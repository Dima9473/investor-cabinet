import { useQuery } from '@tanstack/react-query';

import { investorApi } from './client';

import { AnalyticsRequest, BankName, OperationsRequest } from './types';

const DEFAULT_BANK: BankName = 't-bank';

export const investorQueryKeys = {
  accounts: (bankName: BankName) => ['investor', bankName, 'accounts'] as const,
  analytics: (bankName: BankName, request: AnalyticsRequest) =>
    ['investor', bankName, 'analytics', request] as const,
  operations: (bankName: BankName, request?: OperationsRequest) =>
    ['investor', bankName, 'operations', request] as const,
  portfolio: (bankName: BankName, accountId?: string) =>
    ['investor', bankName, 'portfolio', accountId] as const,
};

export const useInvestorAccounts = (bankName: BankName = DEFAULT_BANK) =>
  useQuery({
    queryFn: () => investorApi.accounts(bankName),
    queryKey: investorQueryKeys.accounts(bankName),
    staleTime: 60_000,
  });

export const useInvestorPortfolio = (
  accountId?: string,
  bankName: BankName = DEFAULT_BANK,
) =>
  useQuery({
    enabled: Boolean(accountId),
    queryFn: () => investorApi.portfolio(bankName, accountId ?? ''),
    queryKey: investorQueryKeys.portfolio(bankName, accountId),
    staleTime: 30_000,
  });

export const useInvestorOperations = (
  request?: OperationsRequest,
  bankName: BankName = DEFAULT_BANK,
) =>
  useQuery({
    enabled: Boolean(request?.accountId),
    queryFn: () => investorApi.operations(bankName, request as OperationsRequest),
    queryKey: investorQueryKeys.operations(bankName, request),
    staleTime: 30_000,
  });

export const useInvestorAnalytics = (
  request?: AnalyticsRequest,
  bankName: BankName = DEFAULT_BANK,
) =>
  useQuery({
    enabled: Boolean(request?.accountId),
    queryFn: () => investorApi.analytics(bankName, request as AnalyticsRequest),
    queryKey: investorQueryKeys.analytics(bankName, request as AnalyticsRequest),
    staleTime: 60_000,
  });
