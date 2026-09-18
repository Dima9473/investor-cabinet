import { useOutletContext } from 'react-router';

import { InvestorAccount } from 'shared/api/investor';

export type InvestorOutletContext = {
  account?: InvestorAccount;
  accountId?: string;
  accounts: InvestorAccount[];
  accountsError: Error | null;
  accountsLoading: boolean;
  generatedAt?: string;
  refetchAccounts: () => void;
  unsupportedAccountsCount: number;
};

export const useInvestorLayout = () => useOutletContext<InvestorOutletContext>();
