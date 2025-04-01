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
