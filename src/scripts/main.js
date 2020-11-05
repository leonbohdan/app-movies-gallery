'use strict';

const url = 'http://my-json-server.typicode.com/moviedb-tech/movies/list';

const moviesFromServer = [];
const movieFromServer = [];
let favoritMovies = [];

const root = document.getElementById('root');
const moviesList = root.querySelector('.movies__list');
const moviesItem = root.querySelectorAll('.movies__name');
const favoriteList = root.querySelector('.favorite__list');
const favorite = root.querySelector('.movies__addFavorite');

// console.log(favoritMovies);

moviesList.addEventListener('click', (event) => {
  const item = event.target;
  const moviesItem = item.closest('.movies__item');
  const moviesName = moviesItem.querySelector('.movies__name');

  if (!item.classList.contains('movies__addFavorite')) {
    return;
  }

  // if (favoritMovies.includes(moviesName.innerText)) {
  //   return;
  // }

  // favoritMovies = [];
  favoritMovies.push(moviesName.innerText);
  initFavoriteMovies(favoritMovies);

  console.log(item);
  console.log(moviesItem);
  console.log(moviesName.innerText);
  console.log(favoritMovies);
});

const getMovies = () => {
  return fetch(url)
    .then(response => response.json())
    .then(function (data) {
      moviesFromServer.push(...data);

      initMovies(moviesFromServer);

      return data;
    });
};

getMovies();

const getMovie = (id) => {
  return fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((data) => movieFromServer.push(data));
};

getMovie(3);

console.log(moviesFromServer);
// console.log(movieFromServer);

// initMovies(moviesFromServer);

function initMovies(movies) {
  for (const movie of movies) {
    moviesList.insertAdjacentHTML('beforeend', `
      <div class="movies__item">
        <img class="movies__image" src=${movie.img} alt="movie image"/>
        <div class="movies__name">${movie.name}</div>
        <div class="movies__year">${movie.year}</div>
        <span class="movies__addFavorite" alt="star" id=${movie.id}></span>
      </div>
    `);
  }
};

// initFavoriteMovies(favoritMovies);

function initFavoriteMovies(movies) {
  for (const name of movies) {
    favoriteList.insertAdjacentHTML('beforeend', `
      <span class="favorite__before"></span>
      <span class="favorite__after"></span>
      <li class="favorite__item">${name}</li>
    `);
  }
}
