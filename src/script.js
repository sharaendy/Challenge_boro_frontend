async function app() {
  const state = {
    cards: [],
  };

  await fetch('http://contest.elecard.ru/frontend_data/catalog.json')
    .then((res) => res.json())
    .then((json) => {
      state.cards = json;
    })
    .catch((error) => {
      console.warn(error);
      alert('Error receiving data from the server');
    });

  const cardList = document.querySelector('.cards-wrapper');
  const createNode = (element) => document.createElement(element);
  const appendElement = (parent, element) => parent.append(element);

  function renderCards(cards) {
    const buttonEl = document.createElement('button');
    buttonEl.classList.add('card-btn');
    buttonEl.textContent = 'X';

    const cardInfoEl = document.createElement('div');
    cardInfoEl.classList.add('card-info');
    cardInfoEl.textContent = 'Yep, just some simple content ecapsulated in this card.';

    cards.map((card) => {
      const { category } = card;
      const listEl = createNode('li');
      const imageEl = createNode('img');
      const imagePath = `http://contest.elecard.ru/frontend_data/${card.image}`;

      listEl.classList.add('card');
      imageEl.classList.add('img');
      imageEl.src = imagePath;

      switch (category) {
        case 'animals':
          imageEl.alt = 'image with animals';
          break;
        case 'business':
          imageEl.alt = 'image with business attr-s';
          break;
        case 'vehicle':
          imageEl.alt = 'image with vehicle';
          break;
        case 'food':
          imageEl.alt = 'image with food';
          break;
        case 'health':
          imageEl.alt = 'image with health attr-s';
          break;
        case 'places':
          imageEl.alt = 'image with some place';
          break;
        case 'science':
          imageEl.alt = 'image with science attr-s';
          break;
        case 'winter':
          imageEl.alt = 'winter landscape';
          break;
        default:
          imageEl.alt = '';
          break;
      }

      appendElement(listEl, cardInfoEl);
      appendElement(listEl, imageEl);
      appendElement(listEl, buttonEl);
      appendElement(cardList, listEl);

      return null;
    });
  }

  renderCards(state.cards);
}

app();
