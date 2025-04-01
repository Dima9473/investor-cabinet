import { Outlet, useParams } from 'react-router';
import { useStore } from 'store/useStore';

import { SelectAccount } from 'features/Bank/ui/SelectAccount';
import { SelectPeriod } from 'features/Bank/ui/SelectPeriod';
import { getOperationsParams } from 'pages/Banks/lib/getOperationsParams';

import { useBankOperations } from 'endpoints/hooks/bank/useBankOperations';

import styles from './BanksLayout.module.css';
export const BanksLayout = () => {
  const { from, to, account } = useStore();

  const { bankName = '' } = useParams();

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

  return (
    <div className={styles.container}>
      BanksLayout put here controls to change bank conditions
      <div className={styles.controls}>
        <SelectPeriod />
        <SelectAccount />
        <button onClick={() => refetch()}>обновить данные</button>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

BanksLayout.displayName = 'BanksLayout';
