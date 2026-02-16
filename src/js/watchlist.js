const WATCHLIST_KEY = "watchlist";

export function getWatchlist() {

  return JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || [];

}

export function saveWatchlist(list) {

  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));

}

export function addToWatchlist(movie) {

  const list = getWatchlist();

  if (!list.find(m => m.id === movie.id)) {

    list.push(movie);
    saveWatchlist(list);

  }

}

export function removeFromWatchlist(id) {

  let list = getWatchlist();

  list = list.filter(movie => movie.id !== id);

  saveWatchlist(list);

}
export function displayWatchlist() {

  const watchlistDiv = document.getElementById("watchlist");

  const watchlist = getWatchlist();

  watchlistDiv.innerHTML = "";

  watchlist.forEach(movie => {

    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/300x450?text=No+Image";

    const div = document.createElement("div");

    div.classList.add("movie");

    div.innerHTML = `
      <img src="${poster}">
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

