console.log('Movie Explorer loaded');
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query === "") {
    results.innerHTML = "<p>Please enter a movie name.</p>";
    return;
  }

  results.innerHTML = `<p>You searched for: <strong>${query}</strong></p>`;
});
