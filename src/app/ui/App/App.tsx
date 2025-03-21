import { useTheme } from 'lib/useTheme';
import { Outlet } from 'react-router';
import { useMount } from 'react-use';

export const App = () => {
  const { initTheme } = useTheme();

  useMount(initTheme);

  return (
    <>
      <Outlet />
    </>
  );
};
