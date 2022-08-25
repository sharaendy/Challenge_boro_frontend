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
    cards.map((card) => {
      const { image, category } = card;

      const listEl = createNode('li');
      const cardInfoEl = createNode('div');
      const buttonEl = createNode('button');
      const imageEl = createNode('img');
      const imagePath = `http://contest.elecard.ru/frontend_data/${image}`;

      listEl.classList.add('card');
      imageEl.classList.add('card-img');
      imageEl.src = imagePath;
      cardInfoEl.classList.add('card-info');
      buttonEl.classList.add('card-btn');

      cardInfoEl.textContent = 'Yep, just some simple content ecapsulated in this card.';
      buttonEl.textContent = 'X';

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

      appendElement(listEl, imageEl);
      appendElement(listEl, cardInfoEl);
      appendElement(listEl, buttonEl);
      appendElement(cardList, listEl);

      return null;
    });
  }

  renderCards(state.cards);
}

app();
