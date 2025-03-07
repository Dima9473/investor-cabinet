// import { useEffect } from 'react';

// import { fetchTBankAccounts } from 'pages/Banks/api/fetchTBankAccounts';
import { useTbankAccounts } from 'pages/Banks/hooks/useTBankAccounts';

export const TBank = () => {
  const { data } = useTbankAccounts();

  /*
   * useEffect(() => {
   *   const getAccounts = async () => {
   *     const test = await fetchTBankAccounts();
   *     debugger;
   *     console.log(test);
   *   };
   */

  /*
   *   getAccounts();
   * }, []);
   */

  console.log(data);
  return <>T-Bank</>;
};
