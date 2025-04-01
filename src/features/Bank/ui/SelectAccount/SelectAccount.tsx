import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStore } from 'store/useStore';

import { Select } from 'shared/ui/Select';

import { useAccountInfo } from 'endpoints/hooks/bank/useAccountInfo';

import { Account } from 'endpoints/model/types/bank/accounts';

export const SelectAccount = () => {
  const { account, setAccount, setAccounts } = useStore();

  const { bankName = '' } = useParams();

  const { data: accounts, isFetched: isAccountsFetched } =
    useAccountInfo(bankName);

  const handleChangeAccount = (account?: Account) => {
    setAccount(account);
  };

  useEffect(() => {
    if (accounts && isAccountsFetched) {
      setAccount(accounts[0]);
      setAccounts(accounts);
    }
  }, [accounts, isAccountsFetched, setAccounts, setAccount]);

  return (
    <Select
      label="Счет"
      value={account?.id}
      options={
        accounts?.map((account) => ({
          id: account.id,
          name: account.name || '',
          option: account,
        })) || []
      }
      onChange={handleChangeAccount}
    />
  );
};

SelectAccount.displayName = 'SelectAccount';
