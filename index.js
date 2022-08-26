import uniqueId from 'lodash/uniqueId.js';

async function app() {
  const state = {
    cards: [],
    uiState: [],
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

  function setUiState() {
    state.uiState = state.cards.map((item) => {
      const uiElem = { ...item, id: uniqueId(), isVisible: true };
      return uiElem;
    });
  }

  const cardList = document.querySelector('.cards-wrapper');
  const createNode = (element) => document.createElement(element);
  const appendElement = (parent, element) => parent.append(element);

  function changeVisibility(eventId) {
    state.uiState.forEach((item) => {
      const uiItem = item;
      if (eventId === item.id) {
        uiItem.isVisible = false;
      }
    });
  }

  function renderUi(cards) {
    cards
      .filter(({ isVisible }) => isVisible)
      .map((card) => {
        const { image, category, id } = card;

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
        buttonEl.setAttribute('id', id);
        listEl.addEventListener('click', (e) => {
          // e.currentTarget.style.transition = 'opacity 0.7s';
          // e.currentTarget.style.opacity = '0';
          changeVisibility(e.target.id);
          cardList.innerHTML = null;
          renderUi(state.uiState);
        });

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

  setUiState();
  renderUi(state.uiState);

  function resetView() {
    cardList.innerHTML = null;
    setUiState();
    renderUi(state.uiState);
  }

  const refreshBtnEl = document.querySelector('.refresh-btn');
  refreshBtnEl.addEventListener('click', resetView);
}

app();
