import { useEffect } from 'react';
import { useStore } from 'store/useStore';

import { SelectAccount } from 'features/Bank/ui/SelectAccount';
import { SelectBank } from 'features/Bank/ui/SelectBank';
import { SelectPeriod } from 'features/Bank/ui/SelectPeriod';

import { useAccountInfo } from 'endpoints/hooks/bank/useAccountInfo';

import styles from './Controls.module.css';

export const Controls = () => {
  const { setAccount, setAccounts, bankId } = useStore();

  console.log(bankId);
  const { data: accounts, isFetched: isAccountsFetched } =
    useAccountInfo(bankId);

  useEffect(() => {
    if (isAccountsFetched) {
      setAccount(accounts?.[0]);
      setAccounts(accounts);
    }
  }, [accounts, isAccountsFetched, setAccounts, setAccount]);

  return (
    <div className={styles.controls}>
      <SelectBank />
      <SelectPeriod />
      <SelectAccount accounts={accounts ?? []} />
    </div>
  );
};

Controls.displayName = 'Controls';
