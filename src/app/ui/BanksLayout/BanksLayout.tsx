import { format, parse } from 'date-fns';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router';
import { useStore } from 'store/useStore';

import { DateRange } from 'shared/ui/DateRange/DateRange';
import { Select } from 'shared/ui/Select';
import { getOperationsParams } from 'pages/Banks/lib/getOperationsParams';

import { useAccountInfo } from 'endpoints/hooks/banks/useAccountInfo';
import { useBankOperations } from 'endpoints/hooks/banks/useBankOperations';

import { Account } from 'endpoints/model/types/banks/accounts';

import styles from './BanksLayout.module.css';

export const BanksLayout = () => {
  const { from, to, account, setFrom, setTo, setAccounts, setAccount } =
    useStore();

  const { bankName = '' } = useParams();

  const { data: accounts, isFetched: isAccountsFetched } =
    useAccountInfo(bankName);
  const { refetch } = useBankOperations(
    account
      ? getOperationsParams({
          accountId: account.id,
          bankName,
          from: from,
          to: to,
        })
      : undefined,
  );

  const handleChange = (from?: Date | null, to?: Date | null) => {
    setFrom(from ? format(from, 'yyyy/MM/dd') : undefined);
    setTo(to ? format(to, 'yyyy/MM/dd') : undefined);
  };

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
    <div className={styles.container}>
      BanksLayout put here controls to change bank conditions
      <div className={styles.controls}>
        <DateRange
          from={from ? parse(from, 'yyyy/MM/dd', new Date()) : null}
          to={to ? parse(to, 'yyyy/MM/dd', new Date()) : null}
          onChange={handleChange}
        />
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
        <button onClick={() => refetch()}>обновить данные</button>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

BanksLayout.displayName = 'BanksLayout';
