import { Outlet } from 'react-router';

import { Banks } from '../Banks';

import styles from './MainLayout.module.css';

export const MainLayout = () => {
  return (
    <div className={styles.container}>
      <div>
        MainLayout
        <Banks />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

MainLayout.displayName = 'MainLayout';
