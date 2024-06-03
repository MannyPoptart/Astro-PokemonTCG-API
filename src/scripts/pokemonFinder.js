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
      const setTotalCards = data;
      const cards = data.data;
      // console.log(setTotalCards.totalCount);
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
              <li class='artist'>Artist: ${card.artist}</li>
              <li class='cardNum'>Card #: ${card.number} / ${card.set.total}</li>
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
              <li class='artist'>Artist: ${card.artist}</li>
              <li class='cardNum'>Card #: ${card.number} / ${card.set.total}</li>
              <li class='weakness'>Weakness: ${card.weaknesses[0].type}</li>
            </ul>
          `;
          container.insertAdjacentHTML('beforeend', temp);
        } else {
          const temp = `
            <ul class='card' style='border-color: ${colors.Colors['Trainer']};'>
              <li>${card.name}</li>
              <li class='types'>Type: Trainer</li>
              <img class='pokeIMG' src="${card.images.large}" alt="">
              <li class='artist'>Artist: ${card.artist}</li>
              <li class='cardNum'>Card #: ${card.number} / ${card.set.total}</li>
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

// If the set has more than 250 cards, display a button which will take the next page of cards to display in order by number
document.getElementById('nextPage').addEventListener('click', function() {
  const setID = document.getElementById('pokemon-sets').value;
  const data = 'https://api.pokemontcg.io/v2/cards?q=set.id:' + setID + '&page=2';

  const container = document.querySelector('.container');
  container.innerHTML = '';

  fetch(data)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const cards = data.data;
      // Make nextPage not hidden
      document.getElementById('nextPage').style.display = 'block';
      cards.sort((a, b) => {
        return a.number - b.number;
      });
      cards.forEach(card => {
        if (card.types && card.types.length == 1) {
          const temp = `
            <ul class='card' style='border-color: ${colors.Colors[card.types[0]]};'>
              <li>${card.name}</li>
              <li class='types'>Type: ${card.types[0]}</li>
              <img class='pokeIMG' src="${card.images.large}" alt="">
              <li class='artist'>Artist: ${card.artist}</li>
              <li class='cardNum'>Card #: ${card.number} / ${card.set.total}</li>
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
              <li class='artist'>Artist: ${card.artist}</li>
              <li class='cardNum'>Card #: ${card.number} / ${card.total}</li>
              <li class='weakness'>Weakness: ${card.weaknesses[0].type}</li>
            </ul>
          `;
          container.insertAdjacentHTML('beforeend', temp);
        } else {
          const temp = `
            <ul class='card' style='border-color: ${colors.Colors['Trainer']};'>
              <li>${card.name}</li>
              <li class='types'>Type: Trainer</li>
              <img class='pokeIMG' src="${card.images.large}" alt="">
              <li class='artist'>Artist: ${card.artist}</li>
              <li class='cardNum'>Card #: ${card.number} / ${card.set.total}</li>
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