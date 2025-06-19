$.ajax({
  url: "http://www.omdbapi.com/?apikey=80cf594c&s=avengers", // url api omdb
  method: "GET", // method yg di pake pasti GET karena ngambil data
  success: function (data) {
    // jika success mengambil data
    const movies = data.Search;
    let cards = "";
    if (movies) {
      // Add a check to ensure movies array exists
      movies.forEach((movie) => {
        cards += `
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
      });
      $(".movies-container").html(cards);
    } else {
      $(".movies-container").html(
        "<p class='text-center'>No movies found for 'Avengers'.</p>"
      );
    }

    // ketika tombol show detail di klik
    $(".modal-detail-button").on("click", function () {
      // ambil imdbid dari button
      const imdbid = $(this).attr("data-imdbid");
      $.ajax({
        url: `http://www.omdbapi.com/?apikey=80cf594c&i=${imdbid}`,
        method: "GET",
        success: function (data) {
          // ambil data movie
          const movie = data;
          // isi data movie ke dalam modal
          const movieDetail = `
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
          $("#movieDetailModal .modal-body").html(movieDetail);
        },
        error: function (e) {
          console.log("Error fetching movie details:", e.responseText);
        },
      });
    });
  }, // This closing brace was missing
  error: function (e) {
    // jika error
    console.log("Error fetching movie list:", e.responseText);
  },
});
