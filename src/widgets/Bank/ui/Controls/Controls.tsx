import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStore } from 'store/useStore';

import { SelectAccount } from 'features/Bank/ui/SelectAccount';
import { SelectBank } from 'features/Bank/ui/SelectBank';
import { SelectPeriod } from 'features/Bank/ui/SelectPeriod';

import { useAccountInfo } from 'endpoints/hooks/bank/useAccountInfo';

import styles from './Controls.module.css';

type ControlsProps = {
  refetchOperations: () => void;
};

export const Controls = (props: ControlsProps) => {
  const { refetchOperations } = props;
  const { setAccount, setAccounts } = useStore();

  const { bankName = '' } = useParams();

  const { data: accounts, isFetched: isAccountsFetched } =
    useAccountInfo(bankName);

  useEffect(() => {
    if (isAccountsFetched) {
      setAccount(accounts?.[0]);
      setAccounts(accounts);
    }
  }, [accounts, isAccountsFetched, setAccounts, setAccount]);

  if (!accounts?.length) {
    return <div>Нет счетов</div>;
  }

  return (
    <div className={styles.controls}>
      <SelectBank />
      <SelectPeriod />
      <SelectAccount accounts={accounts} />
      <Button variant="contained" color="primary" onClick={refetchOperations}>
        обновить данные
      </Button>
    </div>
  );
};

Controls.displayName = 'Controls';
