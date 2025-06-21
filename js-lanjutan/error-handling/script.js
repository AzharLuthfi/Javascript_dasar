// fetch api bawaan js

const searchBtn = document.querySelector(".button-search");
searchBtn.addEventListener("click", async function () {
  try {
    const input = document.querySelector(".input-keyword").value.trim();
    const movies = await getMovies(input); // kalo gapake async await ini akan dianggap syncronus dan akan mengembalikan promise yang masih pending statusnya
    updateUI(movies);
  } catch (error) {
    console.log(error);
  }
});

function getMovies(keyword) {
  return fetch(`http://www.omdbapi.com/?apikey=80cf594c&s=${keyword}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "false") {
        throw new Error(response.Error);
      }
      return response.Search;
    });
}

function updateUI(movies) {
  let card = "";
  if (movies) {
    movies.forEach((movie) => (card += showCards(movie)));
    document.querySelector(".movies-container").innerHTML = card;
  } else {
    document.querySelector(".movies-container").innerHTML =
      "<h2 class='text-center'>No movies found.</h2>";
  }
}

// event binding
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbid = e.target.getAttribute("data-imdbid");
    const movie = await getMovieDetails(imdbid);
    updateMovieDetailUI(movie);
  }
});

function getMovieDetails(imdbid) {
  return fetch(`http://www.omdbapi.com/?apikey=80cf594c&i=${imdbid}`)
    .then((response) => response.json())
    .then((response) => response);
}

function updateMovieDetailUI(movie) {
  const modalDetail = document.querySelector(".modal-body");
  modalDetail.innerHTML = showMovieDetails(movie);
}

function showCards(movie) {
  return `
          <div class="col-md-4 my-3 ">
            <div class="card">
              <img src="${movie.Poster}" class="card-img-top" alt="No poster" />
              <div class="card-body">
                <h5 class="card-title mb-2">${movie.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
                  data-bs-target="#movieDetailModal" data-imdbid="${movie.imdbID}">Show Details</a>
              </div>
            </div>
          </div>
          `;
}

function showMovieDetails(movie) {
  return `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${movie.Poster}" class="img-fluid" alt="No poster">
                    </div>
                    <div class="col-md-9">
                        <ul class="list-group">
                            <li class="list-group-item"><h4><strong>${movie.Title} (${movie.Year})</strong></h4></li>
                            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                            <li class="list-group-item"><strong>Plot:</strong> <br>${movie.Plot}</li>
                            <li class="list-group-item"><strong>Awards:</strong> ${movie.Awards}</li>
                            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                        </ul>
                    </div>
                </div>
            </div>
          `;
}
