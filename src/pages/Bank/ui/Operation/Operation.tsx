import { isBankAbailable } from 'endpoints/lib/isBankAbailable';
import { useStore } from 'store/useStore';

import { DataTable } from 'shared/ui/DataTable';
import { PageLoading } from 'shared/ui/PageLoading';
import { operationColumns } from 'entities/bank/lib/constants/operationColumns';
import { getOperationsParams } from '../../../../entities/bank/lib/getOperationsParams';

import { useBankOperations } from 'endpoints/hooks/bank/useBankOperations';

import styles from './Operation.module.css';

export const Operation = () => {
  const { from, to, account, bankId } = useStore();

  const { data: dataOperations, isFetching: operationsFetching } =
    useBankOperations(
      account
        ? getOperationsParams({
            accountId: account.id,
            from: from,
            to: to,
            bankName: bankId,
          })
        : undefined,
    );

  if (operationsFetching && isBankAbailable(bankId)) {
    return <PageLoading />;
  }

  return (
    <>
      {/* <div className={styles.controls}>
        <Controls refetchOperations={refetch} />
      </div> */}
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

Operation.displayName = 'Operation';
