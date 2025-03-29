export function updateTheme() {
  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (theme) {
    document.documentElement.setAttribute("data-bs-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-bs-theme", "light");
  }
}
