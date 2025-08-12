fetch('publications.json')
  .then(response => response.json())
  .then(publications => {
    // Sort publications by year (descending)
    publications.sort((a, b) => b.year - a.year);

    const list = document.getElementById('pub-list');
    let currentYear = null;

    publications.forEach(pub => {
      // If we hit a new year, create a year heading
      if (pub.year !== currentYear) {
        currentYear = pub.year;
        const yearHeading = document.createElement('h3');
        yearHeading.textContent = currentYear;
        list.appendChild(yearHeading);
      }

      // Create publication entry
      const li = document.createElement('li');
      li.innerHTML = `<strong>${pub.title}</strong><br>
        ${pub.authors} (${pub.year})<br>
        <a href="${pub.link}" target="_blank">Link</a>`;
      list.appendChild(li);
    });
  })
  .catch(error => console.error('Error loading publications:', error));
