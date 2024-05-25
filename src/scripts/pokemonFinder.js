// const key = 'bea89b29-a96f-4bf0-ab54-59373caedba4';

// Data for sets: https://api.pokemontcg.io/v2/sets

// Import colors from colors.json
import colors from '../colors.json';

const sets = 'https://api.pokemontcg.io/v2/sets';

// Fetch the sets and put them into options in order by date released
fetch(sets)
  .then(response => {
    return response.json();
  })
  .then(data => {
    const sets = data.data;
    const select = document.getElementById('pokemon-sets');
    sets.sort((a, b) => {
      return new Date(a.releaseDate) - new Date(b.releaseDate);
    });
    sets.forEach(set => {
      const option = document.createElement('option');
      option.value = set.id;
      option.text = set.name;
      select.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

document.getElementById('pokemon-sets').addEventListener('change', function() {
  const setID = this.value;
  const data = 'https://api.pokemontcg.io/v2/cards?q=set.id:' + setID;

  const container = document.querySelector('.container');
  container.innerHTML = '';

  // Display each card in order by number in the set 1,2,3, etc.
  fetch(data)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const cards = data.data;
      cards.sort((a, b) => {
        return a.number - b.number;
      });
      cards.forEach(card => {
        if (card.types && card.types.length == 1) { // Check if card.types is defined
          const temp = `
            <ul class='card' style='border-color: ${colors.Colors[card.types[0]]};'>
              <li>${card.name}</li>
              <li class='types'>Type: ${card.types[0]}</li>
              <img class='pokeIMG' src="${card.images.large}" alt="">
              <li class='author'>Author: ${card.artist}</li>
              <li class='cardNum'>Card Number: ${card.number}</li>
              <li class='weakness'>${card.weaknesses ? 'Weakness: ' + card.weaknesses[0].type : 'No Weakness'}</li>
            </ul>
          `;
          container.insertAdjacentHTML('beforeend', temp);
        } else if (card.types && card.types.length == 2) {
          const temp = `
            <ul class='card' style='border-image: linear-gradient(to bottom right, ${colors.Colors[card.types[0]]} 10%, ${colors.Colors[card.types[1]]} 100%) 1;'>
              <li>${card.name}</li>
              <li class='types'>Types: ${card.types[0]} & ${card.types[1]}</li>
              <img class='pokeIMG' src="${card.images.large}" alt="">
              <li class='author'>Author: ${card.artist}</li>
              <li class='cardNum'>Card Number: ${card.number}</li>
              <li class='weakness'>Weakness: ${card.weaknesses[0].type}</li>
            </ul>
          `;
          container.insertAdjacentHTML('beforeend', temp);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
