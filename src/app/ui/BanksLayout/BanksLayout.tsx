import { Outlet } from 'react-router';

import styles from './BanksLayout.module.css';

export const BanksLayout = () => {
  return (
    <div className={styles.container}>
      BanksLayout put here controls to change bank conditions
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

BanksLayout.displayName = 'BanksLayout';
