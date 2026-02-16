import { searchMovies,} from "./tmdbApi.js";

import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist
} from "./watchlist.js";



const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const loading = document.getElementById("loading");


// SEARCH MOVIES
searchBtn.addEventListener("click", async () => {

  const query = searchInput.value;

  if (!query) return;

  loading.classList.remove("hidden");

  const movies = await searchMovies(query);

  loading.classList.add("hidden");

  displayResults(movies);

});


// SEARCH WHEN PRESS ENTER
searchInput.addEventListener("keypress", function(e) {

  if (e.key === "Enter") {

    searchBtn.click();

  }

});


// DISPLAY SEARCH RESULTS
function displayResults(movies) {

  const resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = "";

  if (movies.length === 0) {

    resultsDiv.innerHTML = "<p>No movies found</p>";

    return;

  }

  movies.forEach(movie => {

    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/300x450?text=No+Image";

    const div = document.createElement("div");

    div.classList.add("movie");

    div.innerHTML = `
      <img src="${poster}">
      <h3>${movie.title}</h3>
      <p>${movie.release_date || "No date"}</p>
      <button>Add to Watchlist</button>
    `;

    // ADD TO WATCHLIST
    div.querySelector("button").addEventListener("click", () => {

      addToWatchlist(movie);

      displayWatchlist();

    });

    resultsDiv.appendChild(div);

  });

}


// DISPLAY WATCHLIST
function displayWatchlist() {

  const watchlistDiv = document.getElementById("watchlist");

  if (!watchlistDiv) return;

  const watchlist = getWatchlist();

  watchlistDiv.innerHTML = "";

  watchlist.forEach(movie => {

    const div = document.createElement("div");

    div.classList.add("movie");

    div.innerHTML = `
      <h3>${movie.title}</h3>
      <button>Remove</button>
    `;

    div.querySelector("button").addEventListener("click", () => {

      removeFromWatchlist(movie.id);

      displayWatchlist();

    });

    watchlistDiv.appendChild(div);

  });

}


// INITIAL LOAD WATCHLIST
displayWatchlist();
