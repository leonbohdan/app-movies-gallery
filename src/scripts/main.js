'use strict';

const url = 'http://my-json-server.typicode.com/moviedb-tech/movies/list';

const options = {
  method: 'GET',
};

let moviesFromServer;
const movieFromServer = [];

const root = document.getElementById('root');
const moviesList = root.querySelector('.movies__list');
const favoriteList = root.querySelector('.favorite__list');

// console.log(moviesList);

// const moviesFromServer = fetch(url)
//   .then(response => response.json())
//   .then(data => movies.push(...data));

// getMovies2();

// async function getMovies2() {
//   const response = await fetch(url);

//   return response.json();
// }

// console.log(getMovies2());

const getMovies = () => {
  return fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      return data;

      // moviesFromServer = data;
      // console.log(moviesFromServer, data);
    } /* moviesFromServer.push(...data) */);
};

let a = getMovies();

console.log(a);

const getMovie = (id) => {
  return fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((data) => movieFromServer.push(data));
};

getMovie(3);

console.log(moviesFromServer);
console.log(movieFromServer);

initMovies(a);

function initMovies(movies) {
  for (const movie of movies) {
    moviesList.insertAdjacentHTML('beforebegin', `
      <div class="movies__item">
        <div>${movie.name}</div>
      </div>
    `);
  }
};
