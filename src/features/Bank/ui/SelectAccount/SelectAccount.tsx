import { useMemo } from 'react';
import { useStore } from 'store/useStore';

import { Select } from 'shared/ui/Select';

import { Account, Accounts } from 'endpoints/model/types/bank/accounts';

export type SelectAccountProps = {
  accounts: Accounts;
};

export const SelectAccount = (props: SelectAccountProps) => {
  const { accounts } = props;
  const { account, setAccount } = useStore();

  const handleChangeAccount = (account?: Account) => {
    setAccount(account);
  };

  const options = useMemo(
    () =>
      accounts.map((item) => ({
        id: item.id,
        name: item.name || '',
        value: item,
      })),
    [accounts],
  );

  return (
    <Select
      label="Счет"
      value={account?.id}
      options={options}
      onChange={handleChangeAccount}
    />
  );
};

SelectAccount.displayName = 'SelectAccount';
