const htmlElement = document.querySelector('html');
const toggleButton = document.querySelector('#theme-toggle-button') as HTMLButtonElement;

type Theme = 'light' | 'dark';
const PREFERRED_THEME = 'preferredTheme';

function getPreferredTheme() {
  return window.localStorage.getItem(PREFERRED_THEME);
}

function setPreferredThemeInLocalStorage(theme: Theme) {
  window.localStorage.setItem(PREFERRED_THEME, theme);
}

function toggleTheme() {
  const theme = getThemeAttribute() as Theme;

  if (theme === 'light') {
    setPreferredThemeInLocalStorage('dark');
    setThemeAttribute('dark');
  } else {
    setPreferredThemeInLocalStorage('light');
    setThemeAttribute('light');
  }
}

function getThemeAttribute() {
  return htmlElement?.getAttribute('data-theme');
}

function setThemeAttribute(theme: Theme) {
  htmlElement?.setAttribute('data-theme', theme);
  toggleButton?.setAttribute('data-theme', theme);
}

const preferredTheme = getPreferredTheme() as Theme | null;

if (!preferredTheme) {
  setPreferredThemeInLocalStorage('light'); // default to light
  setThemeAttribute('light');
} else {
  setThemeAttribute(preferredTheme);
}

toggleButton?.addEventListener('click', toggleTheme);
