import { isBankAbailable } from 'endpoints/lib/isBankAbailable';
import { useStore } from 'store/useStore';

import { DataTable } from 'shared/ui/DataTable';
import { PageLoading } from 'shared/ui/PageLoading/PageLoading';
import { operationColumns } from 'entities/bank/lib/constants/operationColumns';
import { getOperationsParams } from 'entities/bank/lib/getOperationsParams';
import { PortfolioAnalysis } from 'features/Bank/ui/PortfolioAnalysis';

import { useBankOperations } from 'endpoints/hooks/bank/useBankOperations';

export const Analytics = () => {
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
      <PortfolioAnalysis />
      {dataOperations && (
        <DataTable
          data={dataOperations.operations}
          columns={operationColumns}
        />
      )}
    </>
  );
};

Analytics.displayName = 'Analytics';
