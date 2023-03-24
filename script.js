// Fetching data and creating radio buttons
fetch('http://127.0.0.1:3000/api/buckets') // Send a GET request to the specified URL
  .then(response => response.json()) // Convert the response to JSON format
  .then(data => { // Access the data returned by the server
    const keys = data.map(bucket => bucket.key); // Extract the "key" property from each object in the array

    // Create a container for the radio buttons
    const container = document.querySelector('#forRadios');
    container.classList.add('my-3');

    // Create a radio button for each key value
    keys.forEach(item => {
      const label = document.createElement('label');
      label.classList.add('mx-3');

      const radio = document.createElement('input');
      radio.classList.add('me-1');

      radio.type = 'radio';
      radio.name = 'items';
      radio.value = item;
      label.appendChild(radio);
      label.appendChild(document.createTextNode(item));
      container.appendChild(label);
    });

    // Add an event listener to each radio button
    const radios = document.querySelectorAll('input[type=radio][name=items]');
    radios.forEach(radio => radio.addEventListener('change', e => {
      const selectedValue = e.target.value;
      displayCards(selectedValue); // Call the function to display the corresponding cards
    }));
  })
  .catch(error => { // Catch any errors that occur during the fetch request
    console.error(error);
    const container = document.querySelector('#forRadios');
    container.textContent = 'Error fetching data';
  });

// Fetching data and creating cards
fetch('http://127.0.0.1:3000/api/data') // Send a GET request to the specified URL
  .then(response => response.json()) // Convert the response to JSON format
  .then(data => { // Access the data returned by the server
    const dataObjects = [];

    // Extract the necessary data from each object in the array
    data.forEach(obj => {
      console.log(bodies)
      if (obj._source.author_label && obj._source.title && obj._source.publications_label) {
        const titles = obj._source.title;
        const authors = obj._source.author_label;
        const pubLabels = obj._source.publications_label;
        for (let i = 0; i < Math.min(authors.length, titles.length, pubLabels.length); i++) {
          dataObjects.push({ title: titles[i], author: authors[i], pubLabel: pubLabels[i]});
        }
      }
    });

    // Create a container for the cards
    const container = document.querySelector('#forCards');

    // Create a card for each data object
    dataObjects.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card', 'my-2');

      const title = document.createElement('h2');
      title.textContent = item.title;
      card.appendChild(title);

      const author = document.createElement('p');
      author.textContent = item.author;
      card.appendChild(author);

      const pubLabel = document.createElement('p');
      pubLabel.textContent = item.pubLabel;
      card.appendChild(pubLabel);

      card.addEventListener('click', () => {
        const title = encodeURIComponent(item.title);
        const body = encodeURIComponent(item.body);
        window.location.href = `/details.html?title=${title}&body=${body}`;
      });
      
      container.appendChild(card);

    });
  })
  .catch(error => { // Catch any errors that occur during the fetch request
    console.error(error);
    const container = document.querySelector('#forCards');
    container.textContent = 'Error fetching data';
  });
// Function to display cards based on selected radio button value
function displayCards(selectedValue) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const pubLabel = card.querySelector('p:last-child').textContent;
    card.style.display = pubLabel === selectedValue ? 'block' : 'none';
  });
}
