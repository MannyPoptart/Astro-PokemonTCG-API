// const key = 'bea89b29-a96f-4bf0-ab54-59373caedba4 ';

document.getElementById('pokemon-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevents the form from submitting the traditional way
  const pokemonID = document.getElementById('pokemon-id-input').value;
  
  const data = 'https://api.pokemontcg.io/v2/cards/' + pokemonID;

  const section = document.querySelector('section');

  fetch(data)
    .then(response => {
      return response.json();
    })
    .then(card => {
      console.log(card);
      const temp = `
        <ul class='card'>
          <li>${card.data.name}</li>
          <img class='pokeIMG' src="${card.data.images.large}" alt="">
          <li class='author'>Author: ${card.data.artist}</li>
        </ul>
      `;
      section.insertAdjacentHTML('afterbegin', temp);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
