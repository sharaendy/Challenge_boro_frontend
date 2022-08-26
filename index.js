import uniqueId from 'lodash/uniqueId.js';

async function app() {
  const state = {
    cards: [],
    uiState: {
      thumbnails: [],
      tree: [],
    },
    filter: null,
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
    state.uiState.thumbnails = state.cards.map((item) => {
      const uiElemThumbnail = { ...item, id: uniqueId(), isVisible: true };
      return uiElemThumbnail;
    });
    state.uiState.tree = state.cards.map((item) => {
      const uiElemTree = { ...item, id: uniqueId() };
      return uiElemTree;
    });
  }

  const cardList = document.querySelector('.cards-wrapper');
  const createNode = (element) => document.createElement(element);
  const appendElement = (parent, element) => parent.append(element);

  function changeVisibility(eventId) {
    state.uiState.thumbnails.forEach((item) => {
      const uiItem = item;
      if (eventId === item.id) {
        uiItem.isVisible = false;
      }
    });
  }

  function renderThumbnailsUi(cards) {
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
          renderThumbnailsUi(state.uiState.thumbnails);
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
  renderThumbnailsUi(state.uiState.thumbnails);

  function resetView() {
    cardList.innerHTML = null;
    setUiState();
    renderThumbnailsUi(state.uiState.thumbnails);
  }

  const refreshBtnEl = document.querySelector('.refresh-btn');
  refreshBtnEl.addEventListener('click', resetView);

  // TODO сортировка

  function sortByField(field) {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }

  const sortElems = document.querySelectorAll('input[data-type]');
  sortElems.forEach((elem) => elem.addEventListener('change', (event) => {
    const sortType = event.target.value;
    state.filter = sortType;
    state.uiState.thumbnails = state.uiState.thumbnails.sort(
      sortByField(sortType),
    );
    cardList.innerHTML = null;
    renderThumbnailsUi(state.uiState.thumbnails);
  }));
}

app();
