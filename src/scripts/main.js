'use strict';

const url = 'https://my-json-server.typicode.com/moviedb-tech/movies/list';

const moviesFromServer = [];
const movieFromServer = [];
const data = JSON.parse(localStorage.getItem('fMovies'));
const favoritMovies = !data ? [] : data;

const root = document.getElementById('root');
const moviesList = root.querySelector('.movies__list');
const favoriteList = root.querySelector('.favorite__list');
const modal = root.querySelector('.modal');

modal.addEventListener('click', (event) => {
  const item = event.target;

  if (!item.classList.contains('modal__close')) {
    return;
  }
  modal.classList.toggle('is-active');

  modal.innerHTML = '';
});

const f1 = (event) => {
  const item = event.target;
  const movieId = item.closest('.movies__item').id;

  if (item.classList.contains('movies__addFavorite')) {
    return;
  }

  getMovie(movieId);

  modal.classList.toggle('is-active');
};

moviesList.addEventListener('click', f1);
// moviesList.removeEventListener(f1);

moviesList.addEventListener('click', (event) => {
  const item = event.target;
  const movieItem = item.closest('.movies__item');
  const moviesName = movieItem.querySelector('.movies__name');

  if (item.classList.contains('movies__addFavorite')) {
    if (favoritMovies.includes(moviesName.innerText)) {
      return;
    }

    favoritMovies.push(moviesName.innerText);

    localStorage.setItem('fMovies', JSON.stringify(favoritMovies));

    favoriteList.insertAdjacentHTML('beforeend', `
      <li class="favorite__item">
        <span class="favorite__before"></span>
        <span class="favorite__after"></span>
        ${moviesName.innerText}
      </li>
    `);
  }
});

favoriteList.addEventListener('click', (event) => {
  const item = event.target;
  const favoriteItem = item.closest('.favorite__item').innerText.trim();

  if (item.matches('.favorite__after')) {
    const index = favoritMovies.indexOf(favoriteItem);
    let dataIndex;

    if (data) {
      dataIndex = data.indexOf(favoriteItem);
    }

    if (index > -1) {
      favoritMovies.splice(index, 1);

      data.splice(dataIndex, 1);

      localStorage.setItem('fMovies', JSON.stringify(data));
    }

    item.closest('.favorite__item').remove();
  }
});

const getMovies = () => {
  return fetch(url)
    .then(response => response.json())
    .then(function(data) {
      moviesFromServer.push(...data);

      initMovies(moviesFromServer);

      return data;
    });
};

getMovies();

const getMovie = (id) => {
  return fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((data) => {
      movieFromServer.push(data);

      initModal(movieFromServer);

      movieFromServer.pop();
    });
};

function initMovies(movies) {
  for (const movie of movies) {
    moviesList.insertAdjacentHTML('beforeend', `
      <div class="movies__item" id=${movie.id}>
        <img class="movies__image" src=${movie.img} alt="movie image"/>
        <div class="movies__name">${movie.name}</div>
        <div class="movies__year">${movie.year}</div>
        <span class="movies__addFavorite" alt="star"></span>
      </div>
    `);
  }
};

initFavoriteMovies(favoritMovies);

function initFavoriteMovies(movies) {
  for (const name of movies) {
    favoriteList.insertAdjacentHTML('beforeend', `
      <li class="favorite__item">
        <span class="favorite__before"></span>
        <span class="favorite__after"></span>
        ${name}
      </li>
    `);
  }
}

function initModal(movie) {

  const getGenres = (movie) => {
    let genrs = '';

    for (const genr of movie[0].genres) {
      genrs += `<div class="modal__genre">${genr}</div>`;
    }

    return genrs;
  };

  const genres = getGenres(movie);

  const getStars = (movie) => {
    let strs = '';

    for (const star of movie[0].starring) {
      strs += `<div class="modal__star">${star}</div>`;
    }

    return strs;
  };

  const stars = getStars(movie);

  modal.insertAdjacentHTML('beforeend', `
    <div class="modal__left">
      <img class="modal__image" src=${movie[0].img} alt="movie image" />
      <div class="modal__info">
        <div class="modal__addFavorite" alt="star"> </div>
        <div class="modal__year">${movie[0].year}</div>
      </div>
      <div class="modal__genres">${genres}</div>
    </div>

    <div class="modal__right">
      <h2 class="modal__name">${movie[0].name}</h2>
      <p class="modal__description">${movie[0].description}</p>
      <p class="modal__director">Director: ${movie[0].director}</p>
      <p class="modal__starring">Starring: ${stars}</p>
      <span class="modal__close"></span>
    </div>
  `);
}
