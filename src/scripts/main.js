'use strict';

const url = 'https://my-json-server.typicode.com/moviedb-tech/movies/list';

const moviesFromServer = [];
const movieFromServer = [];
const data = JSON.parse(localStorage.getItem('fMovies'));
let favoritMovies = !data ? [] : data;

const root = document.getElementById('root');
const moviesList = root.querySelector('.movies__list');
const moviesItem = root.querySelectorAll('.movies__name');
const favoriteList = root.querySelector('.favorite__list');
const favorite = root.querySelector('.movies__addFavorite');
const modal = root.querySelector('.modal');

console.log(modal);

moviesList.addEventListener('click', (event) => {
  const item = event.target;
  const movieId = item.closest('.movies__item').id;

  if (item.classList.contains('movies__addFavorite')) {
    return;
  }

  getMovie(movieId);

  // modal.insertAdjacentHTML('beforeend', `
  //   <div class="modal__left">
  //     <img class="modal__image movies__image" src=${movieFromServer.img} alt="movie image" />
  //     <span class="modal__addFavorite" alt="star"></span>
  //     <div class="modal__year movies__year">2011</div>
  //     <div class="modal__ganres">
  //       <div class="modal__ganre">ganre1</div>
  //       <div class="modal__ganre">ganre2</div>
  //       <div class="modal__ganre">ganre3</div>
  //     </div>

  //   </div>

  //   <div class="modal__right">
  //     <h2 class="modal__name">Name Name</h2>
  //     <p class="modal__description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error laboriosam reprehenderit obcaecati, eaque quae perferendis ratione quaerat nesciunt qui assumenda corrupti dolores rem sit architecto molestias consequatur eum odio mollitia ipsam. Nemo, dicta assumenda. Non, praesentium! Temporibus deleniti rem excepturi impedit officia id adipisci velit, culpa, consequatur obcaecati, officiis necessitatibus?</p>
  //     <p class="modal__director">Director: directorName</p>
  //     <p class="modal__starring">Starring: star1, star2, star3</p>
  //     <span class="modal__close"></span>
  //   </div>
  // `);

  modal.classList.toggle('is-active');

  console.log(movieId);
  console.log(movieFromServer);
  console.log(item);
  console.log(modal.classList.contains("is-active"));
});

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

    if (index > -1) {
      favoritMovies.splice(index, 1);
      localStorage.removeItem('fMovies');
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
    });
};

console.log(moviesFromServer);
// console.log(movieFromServer);

// initMovies(moviesFromServer);

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
      genrs += `<div class="modal__ganre">${genr}</div>`;
    }

    return genrs;
  };

  const genres = getGenres(movie);

  console.log(genres);

  modal.insertAdjacentHTML('beforeend', `
    <div class="modal__left">
      <img class="modal__image movies__image" src=${movie[0].img} alt="movie image" />
      <span class="modal__addFavorite" alt="star"></span>
      <div class="modal__year movies__year">${movie[0].year}</div>
      <div class="modal__ganres">${genres}</div>
    </div>

    <div class="modal__right">
      <h2 class="modal__name">Name Name</h2>
      <p class="modal__description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error laboriosam reprehenderit obcaecati, eaque quae perferendis ratione quaerat nesciunt qui assumenda corrupti dolores rem sit architecto molestias consequatur eum odio mollitia ipsam. Nemo, dicta assumenda. Non, praesentium! Temporibus deleniti rem excepturi impedit officia id adipisci velit, culpa, consequatur obcaecati, officiis necessitatibus?</p>
      <p class="modal__director">Director: directorName</p>
      <p class="modal__starring">Starring: star1, star2, star3</p>
      <span class="modal__close"></span>
    </div>
  `);
}
