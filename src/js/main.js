import { searchMovies } from './tmdbApi.js';

// Get DOM elements
const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchBtn');
const resultsContainer = document.querySelector('#results');

// Function to render movie cards
function renderMovies(movies) {
  resultsContainer.innerHTML = ''; // clear previous results

  if (!movies || movies.length === 0) {
    resultsContainer.innerHTML = '<p>No movies found.</p>';
    return;
  }

  movies.forEach(movie => {
    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      : 'https://via.placeholder.com/200x300?text=No+Image';

    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `
      <img src="${poster}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>Release: ${movie.release_date || 'N/A'}</p>
      <p>Rating: ${movie.vote_average || 'N/A'}</p>
    `;

    resultsContainer.appendChild(movieCard);
  });
}

// Function to handle search
async function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) return;

  resultsContainer.innerHTML = '<p>Loading...</p>';
  try {
    const movies = await searchMovies(query);
    renderMovies(movies);
  } catch (err) {
    resultsContainer.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

// Event listener
searchButton.addEventListener('click', handleSearch);

// Optional: allow Enter key to search
searchInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleSearch();
  }
});

