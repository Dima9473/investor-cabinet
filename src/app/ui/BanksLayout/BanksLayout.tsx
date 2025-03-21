import { Dayjs } from 'dayjs';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useStore } from 'store/useStore';

import { DateRange } from 'shared/ui/DateRange/DateRange';
import { Select } from 'shared/ui/Select';
import { useTbankAccounts } from 'pages/Banks/hooks/useTBankAccounts';
import { useTbankOperations } from 'pages/Banks/hooks/useTbankOperations';

import styles from './BanksLayout.module.css';

export const BanksLayout = () => {
  const { from, to, setFrom, setTo, setAccounts } = useStore();
  const { data: accounts, isFetched: isAccountsFetched } = useTbankAccounts();
  const { refetch } = useTbankOperations(
    accounts
      ? {
          accountId: accounts[0].id,
          from: from ? from : undefined,
          to: to ? to : undefined,
        }
      : undefined,
  );

  const handleChange = (from?: Dayjs | null, to?: Dayjs | null) => {
    setFrom(from);
    setTo(to);
  };

  useEffect(() => {
    if (accounts && isAccountsFetched) {
      setAccounts(accounts);
    }
  }, [accounts, isAccountsFetched, setAccounts]);

  return (
    <div className={styles.container}>
      BanksLayout put here controls to change bank conditions
      <div className={styles.controls}>
        <DateRange onChange={handleChange} />
        <Select
          options={
            accounts?.map((account) => ({
              id: account.id,
              name: account.name || '',
              options: account,
            })) || []
          }
        />
        <button onClick={() => refetch()}>обновить данные</button>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

BanksLayout.displayName = 'BanksLayout';
