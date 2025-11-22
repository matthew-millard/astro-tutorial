const html = document.querySelector("html");
const themeTogglebutton = document.querySelector("#theme-toggle-button");
const moonIcon = themeTogglebutton?.querySelector("#moon-icon");
const sunIcon = themeTogglebutton?.querySelector("#sun-icon");

type Theme = "light" | "dark";
const THEME_KEY = "preferred_theme";

function getThemeFromLocalStorage(): Theme | null {
  return window.localStorage.getItem(THEME_KEY) as Theme | null;
}

const initialTheme = getThemeFromLocalStorage() ?? "light";
setTheme(initialTheme);

function setThemeInLocalStorage(theme: Theme) {
  window.localStorage.setItem(THEME_KEY, theme);
}

function setTheme(theme: Theme) {
  if (theme === "dark") {
    moonIcon?.classList.remove("hide");
    sunIcon?.classList.add("hide");
    html?.setAttribute("data-theme", "dark");
    setThemeInLocalStorage("dark");
  } else {
    sunIcon?.classList.remove("hide");
    moonIcon?.classList.add("hide");
    html?.setAttribute("data-theme", "light");
    setThemeInLocalStorage("light");
  }
}

function toggleTheme() {
  const currentTheme =
    getThemeFromLocalStorage() ??
    (html?.getAttribute("data-theme") as Theme) ??
    "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);
}

themeTogglebutton?.addEventListener("click", toggleTheme);
