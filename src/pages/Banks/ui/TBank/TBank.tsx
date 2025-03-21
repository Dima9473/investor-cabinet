import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useToggle } from 'react-use';

import { Diary } from 'entities/ui/Diary/Diary';
import { useTbankAccounts } from 'pages/Banks/hooks/useTBankAccounts';
import { useTbankOperations } from 'pages/Banks/hooks/useTbankOperations';

export const TBank = () => {
  const [value, setValue] = useState<Dayjs | null>(null);
  const [open, toggle] = useToggle(false);
  const [inputElement, setInputElement] = useState<HTMLInputElement | null>(
    null,
  );

  const { data: accounts } = useTbankAccounts();
  const { data: operations } = useTbankOperations(
    accounts ? { accountId: accounts[0].id } : undefined,
  );

  const handleFocus = useCallback(() => {
    toggle();
  }, [toggle]);

  useEffect(() => {
    inputElement?.addEventListener('click', handleFocus);

    return () => {
      inputElement?.removeEventListener('click', handleFocus);
    };
  }, [inputElement, handleFocus]);

  if (!accounts) {
    return <>T-Bank</>;
  }

  return (
    <>
      T-Bank
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          open={open}
          onOpen={() => toggle(true)}
          onClose={() => toggle(false)}
          label="Basic example"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          inputRef={(element) => setInputElement(element)}
          // slots={{
          //   textField: (params) => {
          //     return (
          //       <TextField
          //         {...params}
          //         InputLabelProps={{
          //           shrink: true,
          //         }}
          //         onClick={(e) => setOpen(true)}
          //       />
          //     );
          //   },
          // }}
        />
      </LocalizationProvider>
      {accounts.map((account) => (
        <>{account.name}</>
      ))}
      <br />
      <Diary operations={operations} />
    </>
  );
};

TBank.displayName = 'TBank';
