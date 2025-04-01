import { SelectAccount } from 'features/Bank/ui/SelectAccount';
import { SelectPeriod } from 'features/Bank/ui/SelectPeriod';

import styles from './Controls.module.css';

type ControlsProps = {
  refetchOperations: () => void;
};

export const Controls = (props: ControlsProps) => {
  const { refetchOperations } = props;
  return (
    <div className={styles.controls}>
      <SelectPeriod />
      <SelectAccount />
      <button onClick={refetchOperations}>обновить данные</button>
    </div>
  );
};

Controls.displayName = 'Controls';
