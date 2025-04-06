import { isBankAbailable } from 'endpoints/lib/isBankAbailable';
import { useParams } from 'react-router';
import { useStore } from 'store/useStore';

import { DataTable } from 'shared/ui/DataTable';
import { PageLoading } from 'shared/ui/PageLoading';
import { Text } from 'shared/ui/Typography';
import { operationColumns } from 'entities/bank/lib/constants/operationColumns';
import { Controls } from 'widgets/Bank/ui/Controls';
import { getOperationsParams } from '../../../../entities/bank/lib/getOperationsParams';

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
    return <PageLoading />;
  }

  return (
    <>
      <div className={styles.controls}>
        <Controls refetchOperations={refetch} />
      </div>
      <Text color="secondary">{account?.name}</Text>
      {dataOperations && (
        <DataTable
          data={dataOperations.operations}
          columns={operationColumns}
          className={styles.table}
        />
      )}
    </>
  );
};

Bank.displayName = 'Bank';
