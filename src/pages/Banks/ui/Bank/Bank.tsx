import { isBankAbailable } from 'endpoints/lib/isBankAbailable';
import { useParams } from 'react-router';
import { useStore } from 'store/useStore';

import { DataTable } from 'shared/ui/DataTable';
import { Controls } from 'widgets/Bank/ui/Controls';
import { getOperationsParams } from '../../lib/getOperationsParams';

import { useBankOperations } from 'endpoints/hooks/bank/useBankOperations';

import styles from './Bank.module.css';

export const Bank = () => {
  const { from, to, account } = useStore();
  const { bankName = '' } = useParams();

  const {
    data: dataOperations,
    isFetching: operationsFetching,
    refetch,
  } = useBankOperations(
    account
      ? getOperationsParams({
          accountId: account.id,
          from: from,
          to: to,
          bankName,
        })
      : undefined,
  );

  if (operationsFetching && isBankAbailable(bankName)) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className={styles.controls}>
        <Controls refetchOperations={refetch} />
      </div>
      {account?.name}
      {dataOperations && <DataTable data={dataOperations.operations} />}
    </>
  );
};

Bank.displayName = 'Bank';
