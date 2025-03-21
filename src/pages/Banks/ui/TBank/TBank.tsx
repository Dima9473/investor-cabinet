import { useState } from 'react';
import DatePicker from 'react-datepicker';

import { DataTable } from 'shared/ui/DataTable';

import { useTbankAccounts } from '../../hooks/useTBankAccounts';
import { useTbankOperations } from '../../hooks/useTbankOperations';

import 'react-datepicker/dist/react-datepicker.css';

export const TBank = () => {
  const [dataFrom, setDataFrom] = useState<Date | null>(null);
  const [dataTo, setDataTo] = useState<Date | null>(null);

  const { data: accounts } = useTbankAccounts();
  const {
    data: operations,
    isFetching: operationsFetching,
    refetch,
  } = useTbankOperations(
    accounts
      ? {
          accountId: accounts[0].id,
          from: dataFrom ? dataFrom : undefined,
          to: dataTo ? dataTo : undefined,
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
      <DatePicker selected={dataFrom} onChange={(date) => setDataFrom(date)} />
      <DatePicker selected={dataTo} onChange={(date) => setDataTo(date)} />
      <button onClick={() => refetch()}>обновить данные</button>
      {accounts.map((account) => (
        <div key={account.id}>{account.name}</div>
      ))}
      <br />
      {operations && <DataTable data={operations} />}
    </>
  );
};

TBank.displayName = 'TBank';
