import { Outlet } from 'react-router';

import { Controls } from 'widgets/Bank';

import styles from './BankLayout.module.css';

export const BankLayout = () => {
  return (
    <div className={styles.container}>
      <Controls />
      <Outlet />
    </div>
  );
};

BankLayout.displayName = 'BankLayout';
