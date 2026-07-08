const filterContent = {
  categories: [
    'Actionspiel',
    'Abenteuer',
    'Indie',
    'MMO',
    'Strategie',
    'Simulation',
  ],
  platforms: ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series'],
};

const games = [
  {
    id: 1,
    title: "Marvel's Spider-Man",
    category: 'Actionspiel',
    platform: 'PlayStation 5',
    price: 51,
    popularity: 98,
    image: './assets/images/marvels-spider-man-3840x2160-11990.jpeg',
  },
  {
    id: 2,
    title: 'Little Nightmares 2',
    category: 'Indie',
    platform: 'PlayStation 4',
    price: 40,
    popularity: 84,
    image: './assets/images/little-nightmares-3840x2160-23002.jpg',
  },
  {
    id: 3,
    title: 'Ghost of Tsushima',
    category: 'Abenteuer',
    platform: 'PlayStation 4',
    price: 48,
    popularity: 93,
    image: './assets/images/ghost-of-tsushima-3840x2160-12887.jpeg',
  },
  {
    id: 4,
    title: 'EA Sports FC 25',
    category: 'Simulation',
    platform: 'PC',
    price: 55,
    popularity: 76,
    image: './assets/images/ea-sports-fc-25-3840x2160-17911.jpg',
  },
  {
    id: 5,
    title: 'Horizon Forbidden West',
    category: 'Abenteuer',
    platform: 'PlayStation 5',
    price: 52,
    popularity: 95,
    image: './assets/images/horizon-zero-dawn-3840x2160-19141.jpg',
  },
  {
    id: 6,
    title: 'Blade Runner',
    category: 'Strategie',
    platform: 'Xbox Series',
    price: 47,
    popularity: 69,
    image: './assets/images/elle-blade-runner-3840x2160-19439.jpg',
  },
];

const elements = {
  categoryFilters: document.querySelector('#category-filters'),
  platformFilters: document.querySelector('#platform-filters'),
  sortSelect: document.querySelector('#sort-select'),
  gamesList: document.querySelector('#games-list'),
  noResults: document.querySelector('#no-results'),
  resultsCount: document.querySelector('#results-count'),
  resetButton: document.querySelector('#reset-filters'),
  filtersForm: document.querySelector('#filters-form'),
};

function createCheckbox(name, value) {
  return `
    <label class="flex items-center gap-3 text-[color:var(--text-soft)]">
      <input
        class="m-0 h-5 w-5 rounded-md accent-[color:var(--accent)]"
        type="checkbox"
        name="${name}"
        value="${value}"
      />
      ${value}
    </label>
  `;
}

function renderFilters() {
  elements.categoryFilters.innerHTML = filterContent.categories
    .map((category) => createCheckbox('category', category))
    .join('');

  elements.platformFilters.innerHTML = filterContent.platforms
    .map((platform) => createCheckbox('platform', platform))
    .join('');
}

function getSelectedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(
    (input) => input.value
  );
}

function sortGames(items, sortValue) {
  const sortedGames = [...items];

  if (sortValue === 'price-asc') {
    return sortedGames.sort((a, b) => a.price - b.price);
  }

  if (sortValue === 'price-desc') {
    return sortedGames.sort((a, b) => b.price - a.price);
  }

  if (sortValue === 'title-asc') {
    return sortedGames.sort((a, b) => a.title.localeCompare(b.title));
  }

  return sortedGames.sort((a, b) => b.popularity - a.popularity);
}

function filterGames() {
  const selectedCategories = getSelectedValues('category');
  const selectedPlatforms = getSelectedValues('platform');
  const sortValue = elements.sortSelect.value;

  const filteredGames = games.filter((game) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(game.category);
    const platformMatch =
      selectedPlatforms.length === 0 ||
      selectedPlatforms.includes(game.platform);

    return categoryMatch && platformMatch;
  });

  return sortGames(filteredGames, sortValue);
}

function renderGames() {
  const visibleGames = filterGames();

  elements.resultsCount.textContent = `Gefundene Spiele: ${visibleGames.length}`;
  elements.noResults.classList.toggle('hidden', visibleGames.length > 0);
  elements.gamesList.classList.toggle('hidden', visibleGames.length === 0);

  elements.gamesList.innerHTML = visibleGames
    .map(
      (game) => `
        <article class="game-card">
          <div class="game-card__image-wrap">
            <img class="game-card__image" src="${game.image}" alt="${game.title}" />
          </div>
          <h3 class="m-0 text-[1.1rem]">${game.title}</h3>
          <p class="game-card__meta">${game.platform}</p>
          <div class="game-card__tags">
            <span class="game-card__tag">${game.category}</span>
            <span class="game-card__tag">Top ${game.popularity}</span>
          </div>
          <div class="game-card__footer">
            <div class="game-card__price">${game.price} €</div>
            <button class="buy-btn" type="button">Kaufen</button>
          </div>
        </article>
      `
    )
    .join('');
}

function resetFilters() {
  elements.filtersForm.reset();
  renderGames();
}

renderFilters();
renderGames();

elements.filtersForm.addEventListener('change', renderGames);
elements.sortSelect.addEventListener('change', renderGames);
elements.resetButton.addEventListener('click', resetFilters);
