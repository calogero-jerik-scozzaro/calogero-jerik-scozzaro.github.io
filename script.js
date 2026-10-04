// Publications live in the HTML too, so the full page works without JavaScript.
(() => {
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  if (!button) return;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let savedTheme;
  try { savedTheme = localStorage.getItem('theme'); } catch (_) { /* Storage can be blocked. */ }
  if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : systemTheme.matches;
  const updateButton = () => {
    root.dataset.theme = isDark() ? 'dark' : 'light';
    button.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme');
    button.setAttribute('title', button.getAttribute('aria-label'));
  };
  updateButton();
  button.hidden = false;
  button.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    savedTheme = root.dataset.theme;
    try { localStorage.setItem('theme', savedTheme); } catch (_) { /* The toggle still works. */ }
    updateButton();
  });
  systemTheme.addEventListener('change', () => {
    if (!savedTheme) {
      root.dataset.theme = systemTheme.matches ? 'dark' : 'light';
      updateButton();
    }
  });
})();
