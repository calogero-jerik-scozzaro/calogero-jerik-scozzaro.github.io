const list = document.getElementById('pub-list');
const toggleButton = document.getElementById('dark-mode-toggle');

const buildBadge = (text) => {
  const badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = text;
  return badge;
};

fetch('publications.json')
  .then((response) => response.json())
  .then((publications) => {
    publications.sort((a, b) => (b.year || 0) - (a.year || 0));

    let currentYear = null;

    publications.forEach((pub) => {
      if (pub.year !== currentYear) {
        currentYear = pub.year;
        const yearHeading = document.createElement('h3');
        yearHeading.className = 'pub-year';
        yearHeading.textContent = currentYear || 'Selected';
        list.appendChild(yearHeading);
      }

      const card = document.createElement('article');
      card.className = 'pub-card';

      const title = document.createElement('p');
      title.className = 'pub-title';
      title.textContent = pub.title;

      const meta = document.createElement('p');
      meta.className = 'pub-meta';
      meta.innerHTML = `${pub.authors}<br><em>${pub.venue}</em>`;

      const actions = document.createElement('div');
      actions.className = 'pub-actions';

      if (pub.link) {
        const link = document.createElement('a');
        link.className = 'pub-link';
        link.href = pub.link;
        link.target = '_blank';
        link.rel = 'noreferrer';
        link.textContent = 'Read paper';
        actions.appendChild(link);
      }

      const awards = [];
      if (pub.award) {
        awards.push(pub.award);
      }
      if (Array.isArray(pub.awards)) {
        awards.push(...pub.awards);
      }

      awards.forEach((award) => {
        actions.appendChild(buildBadge(award));
      });

      card.appendChild(title);
      card.appendChild(meta);
      if (actions.children.length > 0) {
        card.appendChild(actions);
      }
      list.appendChild(card);
    });
  })
  .catch((error) => console.error('Error loading publications:', error));

// Theme toggle
const setThemeButton = (isDark) => {
  toggleButton.textContent = isDark ? '☾' : '★';
};

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  setThemeButton(true);
} else {
  setThemeButton(false);
}

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  setThemeButton(isDark);
});
