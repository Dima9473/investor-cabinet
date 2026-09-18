import { Outlet } from 'react-router';

import { Controls } from 'widgets/Bank';

import styles from './BankLayout.module.css';

export const BankLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <Controls />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

BankLayout.displayName = 'BankLayout';
