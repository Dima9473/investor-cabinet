import { Outlet } from 'react-router';

import styles from './BanksLayout.module.css';

export const BanksLayout = () => {
  return (
    <>
      BanksLayout put here controls to change bank conditions
      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  );
};

BanksLayout.displayName = 'BanksLayout';
