// Publications also live in the HTML. JavaScript only enhances theme selection.
(() => {
  const root = document.documentElement;
  const selector = document.getElementById('theme-selector');
  if (!selector) return;
  const buttons = selector.querySelectorAll('[data-theme-option]');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let savedTheme;
  try { savedTheme = localStorage.getItem('theme'); } catch (_) { /* Storage can be blocked. */ }
  if (savedTheme !== 'light' && savedTheme !== 'dark') savedTheme = undefined;

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.themeOption === theme));
    });
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', theme === 'dark' ? '#121a27' : '#f8fafc');
  };

  applyTheme(savedTheme || (systemTheme.matches ? 'dark' : 'light'));
  selector.hidden = false;
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      savedTheme = button.dataset.themeOption;
      applyTheme(savedTheme);
      try { localStorage.setItem('theme', savedTheme); } catch (_) { /* Selection still works. */ }
    });
  });
  systemTheme.addEventListener('change', () => {
    if (!savedTheme) applyTheme(systemTheme.matches ? 'dark' : 'light');
  });
})();
