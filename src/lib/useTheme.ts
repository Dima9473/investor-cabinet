import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const getStoredTheme = (): Theme => {
  try {
    const stored = localStorage.getItem('data-theme');
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
  } catch {
    return 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  const initTheme = useCallback(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const changeTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('data-theme', theme);
    } catch {
      // The selected theme still works for this session when storage is unavailable.
    }
  }, [theme]);

  return { changeTheme, initTheme, theme };
};
