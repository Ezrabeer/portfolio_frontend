import { useEffect, useState } from 'react';
import {
  isLocalStorageDefined,
  LocalStorageTypes,
} from '@/utils/local-storage-helpers';

type ThemeState = 'light' | 'dark';

type DarkModeReturnTypes = [ThemeState, () => void];

export function useDarkMode(): DarkModeReturnTypes {
  const [theme, setTheme] = useState<ThemeState>(
    isLocalStorageDefined() &&
      localStorage.getItem(LocalStorageTypes.theme) === 'light'
      ? 'light'
      : 'dark'
  );

  useEffect(() => {
    if (!localStorage.getItem(LocalStorageTypes.theme)) {
      const matched = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (matched) {
        setThemeMode('dark');
      } else {
        setThemeMode('light');
      }
    }
  }, []);

  const setThemeMode = (themeMode: ThemeState) => {
    localStorage.setItem(LocalStorageTypes.theme, themeMode);
    setTheme(themeMode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setThemeMode('dark');
    } else {
      setThemeMode('light');
    }
  };

  return [theme, toggleTheme];
}
