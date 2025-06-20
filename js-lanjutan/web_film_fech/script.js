// fetch api bawaan js

const searchBtn = document.querySelector(".button-search");
searchBtn.addEventListener("click", function () {
  const input = document.querySelector(".input-keyword").value.trim();
  fetch(`http://www.omdbapi.com/?apikey=80cf594c&s=${input}`)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      let cards = "";
      if (movies) {
        movies.forEach((movie) => (cards += showCards(movie)));
        document.querySelector(".movies-container").innerHTML = cards;
      } else {
        document.querySelector(".movies-container").innerHTML =
          "<h2 class='text-center'>No movies found.</h2>";
      }

      // ketika tombol show detail di klik
      const modalDetailButtons = document.querySelectorAll(
        ".modal-detail-button"
      );
      modalDetailButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const imdbid = button.getAttribute("data-imdbid");
          fetch(`http://www.omdbapi.com/?apikey=80cf594c&i=${imdbid}`)
            .then((response) => response.json())
            .then((response) => {
              const movie = response;
              // isi data movie ke dalam modal
              const movieDetail = showMovieDetails(movie);
              $("#movieDetailModal .modal-body").html(movieDetail);
            })
            .catch((error) =>
              console.error("Error fetching movie details:", error)
            );
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching movie list:", error);
    });
});

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
