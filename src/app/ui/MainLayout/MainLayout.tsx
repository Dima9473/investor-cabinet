import { Outlet } from 'react-router';

import styles from './MainLayout.module.css';

export const MainLayout = () => {
  return (
    <div className={styles.container}>
      MainLayout
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
