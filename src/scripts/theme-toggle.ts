const html = document.querySelector('html');
const themeTogglebutton = document.querySelector('#theme-toggle-button');
const themeIcon = themeTogglebutton?.querySelector('#theme-icon');
const moonIcon = themeTogglebutton?.querySelector('#moon-icon');
const sunIcon = themeTogglebutton?.querySelector('#sun-icon');

// Update UI to match the theme that was already set by the inline script
updateThemeUI();

function updateThemeUI() {
  const currentTheme = html?.getAttribute('data-theme');

  if (currentTheme === 'dark') {
    moonIcon?.classList.remove('hide');
    sunIcon?.classList.add('hide');
  } else {
    sunIcon?.classList.remove('hide');
    moonIcon?.classList.add('hide');
  }
}

function setTheme(theme: string) {
  updateThemeUI();
  html?.setAttribute('data-theme', theme);
  window.localStorage.setItem('preferredTheme', theme);
}

function getTheme() {
  return html?.getAttribute('data-theme');
}

function toggleTheme() {
  const theme = getTheme();

  if (!theme) {
    setTheme('dark');
  } else if (theme === 'light') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
}

themeTogglebutton?.addEventListener('click', toggleTheme);
