import { useTbankAccounts } from 'pages/Banks/hooks/useTBankAccounts';
import { useTbankOperations } from 'pages/Banks/hooks/useTbankOperations';

export const TBank = () => {
  const { data: accounts } = useTbankAccounts();
  const { data: operations } = useTbankOperations(
    accounts ? { accountId: accounts[0].id } : undefined,
  );

  if (!accounts) {
    return <>T-Bank</>;
  }

  return (
    <>
      T-Bank
      {accounts.map((account) => (
        <>{account.name}</>
      ))}
      <br />
      {operations?.map((operation) => (
        <>
          {operation.id} {operation.date}
        </>
      ))}
    </>
  );
};
