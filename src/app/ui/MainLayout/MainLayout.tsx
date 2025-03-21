import { useTheme } from 'lib/useTheme';
import { Outlet } from 'react-router';

import { Banks } from '../Banks';

import styles from './MainLayout.module.css';

export const MainLayout = () => {
  const { changeTheme } = useTheme();

  return (
    <div className={styles.container}>
      <div>
        MainLayout
        <button onClick={changeTheme}>Change theme</button>
        <Banks />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

MainLayout.displayName = 'MainLayout';
