import { useParams } from 'react-router';
import { useStore } from 'store/useStore';

import { DataTable } from 'shared/ui/DataTable';
import { getOperationsParams } from '../../lib/getOperationsParams';

import { useBankOperations } from 'endpoints/hooks/banks/useBankOperations';

export const TBank = () => {
  const { from, to, account } = useStore();
  const { bankName = '' } = useParams();

  const { data: dataOperations, isFetching: operationsFetching } =
    useBankOperations(
      account
        ? getOperationsParams({
            accountId: account.id,
            from: from,
            to: to,
            bankName,
          })
        : undefined,
    );

  if (!account) {
    return <>{bankName}</>;
  }

  if (operationsFetching) {
    return <>Loading...</>;
  }

  return (
    <>
      {account.name}
      {dataOperations && <DataTable data={dataOperations.operations} />}
    </>
  );
};

TBank.displayName = 'TBank';
