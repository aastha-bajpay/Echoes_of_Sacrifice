import { useState, useEffect } from 'react';
import type { Theme } from '../types';

const THEME_KEY = 'wellfuel_theme';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(THEME_KEY) as Theme) || 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Apply immediately on mount before first render
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      (localStorage.getItem(THEME_KEY) as Theme) || 'light'
    );
  }, []);

  const setTheme = (t: Theme) => setThemeState(t);

  return { theme, setTheme };
}
