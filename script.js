let apiKey = "2a1e2476";

// 🔴 ELEMENTS
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let moviesContainer = document.getElementById("moviesContainer");
let yearFilter = document.getElementById("yearFilter");
let sortSelect = document.getElementById("sortSelect");


// 🔴 MAIN FUNCTION
async function searchMovie(movieName, titleText = "Search Results 🔍") {

  // 🔴 TITLE UPDATE
  document.getElementById("trendingTitle").innerText = titleText;

  // 🔴 EMPTY INPUT
  if (movieName.trim() === "") {
    moviesContainer.innerHTML = "<h2>Please enter a movie name ⚠️</h2>";
    return;
  }

  // 🔴 API CALL
  let response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`);
  let data = await response.json();

  moviesContainer.innerHTML = "";

  // 🔴 API CHECK
  if (data.Response === "True") {

    let filteredMovies = data.Search;

    // 🔴 YEAR FILTER
    if (yearFilter.value !== "all") {
      filteredMovies = filteredMovies.filter(function(movie) {
        return movie.Year.includes(yearFilter.value);
      });
    }

    // 🔴 SORTING
    if (sortSelect.value === "az") {
      filteredMovies.sort(function(a, b) {
        return a.Title.localeCompare(b.Title);
      });
    }

    if (sortSelect.value === "za") {
      filteredMovies.sort(function(a, b) {
        return b.Title.localeCompare(a.Title);
      });
    }

    if (sortSelect.value === "yearLow") {
      filteredMovies.sort(function(a, b) {
        return parseInt(a.Year) - parseInt(b.Year);
      });
    }

    if (sortSelect.value === "yearHigh") {
      filteredMovies.sort(function(a, b) {
        return parseInt(b.Year) - parseInt(a.Year);
      });
    }

    // 🔴 DISPLAY
    filteredMovies.forEach(function(movie) {

      let card = document.createElement("div");
      card.classList.add("movie-card");

      card.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      `;

      moviesContainer.appendChild(card);
    });

    // 🔴 FILTER EMPTY
    if (filteredMovies.length === 0) {
      moviesContainer.innerHTML = "<h2>No movie found for selected filter 😢</h2>";
    }

  } else {
    moviesContainer.innerHTML = "<h2>No movie found 😢</h2>";
  }
}


// 🔴 PAGE LOAD → TRENDING
window.addEventListener("load", function() {
  searchMovie("avengers", "Trending Movies 🔥");
});


// 🔴 BUTTON CLICK
searchBtn.addEventListener("click", function() {
  searchMovie(searchInput.value, "Search Results 🔍");
});


// 🔴 ENTER KEY
searchInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    searchMovie(searchInput.value, "Search Results 🔍");
  }
});


// 🔴 YEAR FILTER CHANGE
yearFilter.addEventListener("change", function() {
  searchMovie(searchInput.value, "Search Results 🔍");
});


// 🔴 SORT CHANGE
sortSelect.addEventListener("change", function() {
  searchMovie(searchInput.value, "Search Results 🔍");
});