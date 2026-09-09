import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

const THEME_STORAGE_KEY = 'bitex:theme';
const VALID_PREFERENCES = new Set(['system', 'light', 'dark']);
const darkMediaQuery = () => window.matchMedia('(prefers-color-scheme: dark)');

const readStoredPreference = () => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return VALID_PREFERENCES.has(stored) ? stored : 'system';
  } catch {
    return 'system';
  }
};

const writeStoredPreference = (preference) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Private browsing / storage quota — the choice just won't survive a reload.
  }
};

/**
 * ThemeProvider
 *
 * Drives the System/Light/Dark choice for the whole app (public site + admin
 * panel share this one setting). The preference is persisted to localStorage;
 * "system" additionally tracks the OS-level `prefers-color-scheme` media query
 * live, so flipping the OS theme updates the app without a reload. The actual
 * theming happens in CSS via the `data-theme` attribute this sets on
 * `<html>` — see styles/global.css and AdminLayout.module.css for the token
 * values each theme resolves to.
 */
export function ThemeProvider({ children }) {
  const [preference, setPreferenceState] = useState(readStoredPreference);
  const [systemPrefersDark, setSystemPrefersDark] = useState(
    () => darkMediaQuery().matches,
  );

  useEffect(() => {
    const media = darkMediaQuery();
    const handleChange = (event) => setSystemPrefersDark(event.matches);

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // No attribute at all for "system" — global.css's prefers-color-scheme
    // media query then decides, so the two mechanisms never fight each other.
    if (preference === 'system') {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = preference;
    }
  }, [preference]);

  const setPreference = useCallback((next) => {
    if (!VALID_PREFERENCES.has(next)) return;
    setPreferenceState(next);
    writeStoredPreference(next);
  }, []);

  const resolvedTheme = preference === 'system' ? (systemPrefersDark ? 'dark' : 'light') : preference;

  const value = useMemo(
    () => ({ preference, setPreference, resolvedTheme }),
    [preference, setPreference, resolvedTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
