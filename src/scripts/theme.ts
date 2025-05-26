const html = document.querySelector('html');
const themeTogglebutton = document.querySelector('#theme-toggle-button');
const preferredTheme = window.localStorage.getItem('preferredTheme');
const themeIcon = themeTogglebutton?.querySelector('#theme-icon');
const moonIcon = themeTogglebutton?.querySelector('#moon-icon');
const sunIcon = themeTogglebutton?.querySelector('#sun-icon');

console.log(themeIcon);

if (preferredTheme) {
  setTheme(preferredTheme);
} else {
  setTheme('light');
}

// if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//   setTheme('dark');
// } else {
//   setTheme('light');
// }

function setTheme(theme: string) {
  if (theme === 'dark') {
    moonIcon?.classList.remove('hide');
    sunIcon?.classList.add('hide');
  } else {
    sunIcon?.classList.remove('hide');
    moonIcon?.classList.add('hide');
  }
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
