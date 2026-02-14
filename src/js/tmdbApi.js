const API_KEY = "33bc85cb63f18b43016dadb946fc4803";
const BASE_URL = "https://api.themoviedb.org/3";

export async function searchMovies(query) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  const data = await response.json();
  return data.results;
}

