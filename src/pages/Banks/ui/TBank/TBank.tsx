import { useStore } from 'store/useStore';

import { DataTable } from 'shared/ui/DataTable';
import { getOperationsParams } from '../../lib/getOperationsParams';

import { useTbankOperations } from '../../hooks/useTbankOperations';

import 'react-datepicker/dist/react-datepicker.css';

export const TBank = () => {
  const { from, to, account } = useStore();

  const { data: dataOperations, isFetching: operationsFetching } =
    useTbankOperations(
      account
        ? getOperationsParams({
            accountId: account.id,
            from: from,
            to: to,
          })
        : undefined,
    );

  if (!account) {
    return <>T-Bank</>;
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
