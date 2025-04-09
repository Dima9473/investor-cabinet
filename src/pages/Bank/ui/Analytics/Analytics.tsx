import { useStore } from 'store/useStore';

import { DataTable } from 'shared/ui/DataTable';
import { operationColumns } from 'entities/bank/lib/constants/operationColumns';
import { getOperationsParams } from 'entities/bank/lib/getOperationsParams';

import { useBankOperations } from 'endpoints/hooks/bank/useBankOperations';

export const Analytics = () => {
  const { from, to, account, bankId } = useStore();

  const { data: dataOperations } = useBankOperations(
    account
      ? getOperationsParams({
          accountId: account.id,
          from: from,
          to: to,
          bankName: bankId,
        })
      : undefined,
  );

  const filteredOperations = dataOperations?.operations.filter(
    (operation) => operation.instrumentType === 'Stock',
  );

  return (
    <div>
      <DataTable columns={operationColumns} data={filteredOperations ?? []} />
    </div>
  );
};

Analytics.displayName = 'Analytics';
