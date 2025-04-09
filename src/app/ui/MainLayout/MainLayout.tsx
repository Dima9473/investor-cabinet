import NightlightOutlined from '@mui/icons-material/NightlightOutlined';
import WbSunnyOutlined from '@mui/icons-material/WbSunnyOutlined';
import classNames from 'classnames';
import { useTheme } from 'lib/useTheme';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import {
  ANALYTICS_ROUTE,
  JOURNAL_ROUTE,
  OPERATIONS_ROUTE,
} from 'shared/lib/const/routes/fullPaths';
import { KNOWLEDGE_CATALOG } from 'shared/lib/const/routes/shortPaths';
import { NavLink } from 'shared/ui/NavLink';
import { Text } from 'shared/ui/Typography';

import styles from './MainLayout.module.css';

export const MainLayout = () => {
  const { changeTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const theme = localStorage.getItem('data-theme');
    setCurrentTheme(theme as 'light' | 'dark');
  }, []);

  const handleChangeTheme = () => {
    const theme = changeTheme();
    setCurrentTheme(theme);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <Text color="secondary">Кабинет инвестора</Text>
          {currentTheme === 'light' ? (
            <WbSunnyOutlined
              onClick={handleChangeTheme}
              className={styles.icon}
            />
          ) : (
            <NightlightOutlined
              onClick={handleChangeTheme}
              className={classNames(styles.icon, styles.dark)}
            />
          )}
        </div>
        <div className={styles.links}>
          {/* <Banks /> */}
          <NavLink to={OPERATIONS_ROUTE}>Операции</NavLink>
          <NavLink to={ANALYTICS_ROUTE}>Аналитика</NavLink>
          <NavLink to={JOURNAL_ROUTE}>Дневник</NavLink>
          <NavLink to={KNOWLEDGE_CATALOG}>Knowledge Catalog</NavLink>
        </div>
        <div className={styles.footer}></div>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

MainLayout.displayName = 'MainLayout';
