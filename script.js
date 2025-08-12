fetch('publications.json')
  .then(response => response.json())
  .then(publications => {
    // Sort publications by year descending
    publications.sort((a, b) => b.year - a.year);

    const list = document.getElementById('pub-list');
    let currentYear = null;

    publications.forEach(pub => {
      if (pub.year !== currentYear) {
        currentYear = pub.year;
        const yearHeading = document.createElement('h3');
        yearHeading.textContent = currentYear;
        list.appendChild(yearHeading);
      }

      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${pub.title}</strong><br>
        ${pub.authors}<br>
        <em>${pub.venue}</em><br>
        <a href="${pub.link}" target="_blank">[Link]</a>
      `;
      list.appendChild(li);
    });
  })
  .catch(error => console.error('Error loading publications:', error));

  const toggleButton = document.getElementById('dark-mode-toggle');

  // Load saved theme on page load
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    toggleButton.textContent = '🌜';
  }
  
  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  
    if (document.body.classList.contains('dark-mode')) {
      toggleButton.textContent = '🌜';
      localStorage.setItem('theme', 'dark');
    } else {
      toggleButton.textContent = '🌞';
      localStorage.setItem('theme', 'light');
    }
  });
  
