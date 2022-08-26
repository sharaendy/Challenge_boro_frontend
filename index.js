import uniqueId from 'lodash/uniqueId.js';

async function app() {
  const state = {
    cards: [],
    uiState: {
      thumbnails: [],
      tree: [],
    },
    view: {
      currentPage: 1,
      rowsOnPage: 100,
    },
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

  function changeVisibility(eventId) {
    state.uiState.thumbnails.forEach((item) => {
      const uiItem = item;
      if (eventId === item.id) {
        uiItem.isVisible = false;
      }
    });
  }

  const cardList = document.querySelector('.cards-wrapper');
  const createNode = (element) => document.createElement(element);
  const appendElement = (parent, element) => parent.append(element);

  function renderThumbnailsUi(cards, rowsOnPage, currentPage) {
    const currentPageMod = currentPage - 1;
    const startSegment = rowsOnPage * currentPageMod;
    const endSegment = startSegment + rowsOnPage;
    const paginatedData = cards.slice(startSegment, endSegment);

    paginatedData
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
          changeVisibility(e.target.id);
          cardList.innerHTML = null;
          renderThumbnailsUi(state.uiState.thumbnails, state.view.rowsOnPage, state.view.currentPage);
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
    localStorage.setItem('lastUi', JSON.stringify(state.uiState.thumbnails));
  }

  setUiState();
  uploadLocalStorage();
  renderThumbnailsUi(state.uiState.thumbnails, state.view.rowsOnPage, state.view.currentPage);
  displayPagination();

  function resetView() {
    localStorage.removeItem('lastUi');
    cardList.innerHTML = null;
    setUiState();
    renderThumbnailsUi(state.uiState.thumbnails, state.view.rowsOnPage, state.view.currentPage);
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
    renderThumbnailsUi(state.uiState.thumbnails, state.view.rowsOnPage, state.view.currentPage);
  }));

  // TODO Локальное хранилище

  function uploadLocalStorage() {
    const lastUiProp = JSON.parse(localStorage.getItem('lastUi'));
    state.uiState.thumbnails = lastUiProp;
  }

  // TODO Пагинатор
  function displayPaginationBtn(pageNumber) {
    const paginatorPage = document.createElement('li');
    paginatorPage.classList.add('pagination__item');
    paginatorPage.textContent = pageNumber;

    if (pageNumber === state.view.currentPage) {
      paginatorPage.classList.add('pagination__item--active');
    }

    paginatorPage.addEventListener('click', () => {
      state.view.currentPage = pageNumber;
      cardList.innerHTML = null;
      renderThumbnailsUi(state.uiState.thumbnails, state.view.rowsOnPage, state.view.currentPage);
      const currentActivePage = document.querySelector('li.pagination__item--active');
      currentActivePage.classList.remove('pagination__item--active');
      paginatorPage.classList.add('pagination__item--active');
    });

    return paginatorPage;
  }

  function displayPagination() {
    const cards = state.uiState.thumbnails;
    const rows = state.view.rowsOnPage;
    const paginationEl = document.querySelector('.pagination');

    const pagesCount = Math.ceil(cards.length / rows);
    const paginatorList = document.createElement('ul');
    paginatorList.classList.add('pagination__list');

    for (let i = 0; i < pagesCount; i += 1) {
      const pageEl = displayPaginationBtn(i + 1);
      paginatorList.append(pageEl);
    }
    paginationEl.append(paginatorList);
  }


}
app();
