import { useTheme } from 'lib/useTheme';
import { Outlet } from 'react-router';

import { KNOWLEDGE_CATALOG } from 'shared/lib/const/routes/shortPaths';
import { NavLink } from 'shared/ui/NavLink';
import { Banks } from '../Banks';

import styles from './MainLayout.module.css';

export const MainLayout = () => {
  const { changeTheme } = useTheme();

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        MainLayout
        <button onClick={changeTheme}>Change theme</button>
        <Banks />
        <NavLink to={KNOWLEDGE_CATALOG}>Knowledge Catalog</NavLink>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

MainLayout.displayName = 'MainLayout';
