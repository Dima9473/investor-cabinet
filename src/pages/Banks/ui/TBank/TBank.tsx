import { parse } from 'date-fns';
import { useStore } from 'store/useStore';

import { DataTable } from 'shared/ui/DataTable';

import { useTbankOperations } from '../../hooks/useTbankOperations';

import 'react-datepicker/dist/react-datepicker.css';

export const TBank = () => {
  const { from, to, account } = useStore();

  const { data: operations, isFetching: operationsFetching } =
    useTbankOperations(
      account
        ? {
            accountId: account.id,
            from: from ? parse(from, 'yyyy/MM/dd', new Date()) : undefined,
            to: to ? parse(to, 'yyyy/MM/dd', new Date()) : undefined,
          }
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
      {operations && <DataTable data={operations} />}
    </>
  );
};

TBank.displayName = 'TBank';
