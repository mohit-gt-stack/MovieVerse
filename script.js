let apiKey = "2a1e2476";

let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let moviesContainer = document.getElementById("moviesContainer");


// function movie search ke liye
async function searchMovie(movieName) {

  let response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`);
  let data = await response.json();

  moviesContainer.innerHTML = "";

  if (data.Search) {

    data.Search.forEach(function(movie) {

      let card = document.createElement("div");
      card.classList.add("movie-card");

      card.innerHTML = `
        <img src="${movie.Poster}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      `;

      moviesContainer.appendChild(card);
    });

  } else {
    moviesContainer.innerHTML = "<h2>No movie found 😢</h2>";
  }
}


// button click par search
searchBtn.addEventListener("click", function() {
  let movieName = searchInput.value;
  searchMovie(movieName);
});


// Enter key par search
searchInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    let movieName = searchInput.value;
    searchMovie(movieName);
  }
});