import { useCallback } from "react";

export const useTheme = () => {
  const initTheme = useCallback(() => {
    const theme = localStorage.getItem('data-theme');

    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
      return;
    }

    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const changeTheme = useCallback(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    const theme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('data-theme', theme);
  }, []);

  return { initTheme, changeTheme };
};
