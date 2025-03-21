import { useStore } from 'store/useStore';

import { DataTable } from 'shared/ui/DataTable';

import { useTbankOperations } from '../../hooks/useTbankOperations';

import 'react-datepicker/dist/react-datepicker.css';

export const TBank = () => {
  const { from, to, accounts } = useStore();

  const { data: operations, isFetching: operationsFetching } =
    useTbankOperations(
      accounts
        ? {
            accountId: accounts[0].id,
            from: from ? from : undefined,
            to: to ? to : undefined,
          }
        : undefined,
    );

  if (!accounts) {
    return <>T-Bank</>;
  }

  if (operationsFetching) {
    return <>Loading...</>;
  }

  return (
    <>
      T-Bank
      {accounts.map((account) => (
        <div key={account.id}>{account.name}</div>
      ))}
      <br />
      {operations && <DataTable data={operations} />}
    </>
  );
};

TBank.displayName = 'TBank';
