import { useState, useEffect } from "react";

const MovieModal = (props) => {
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieRuntime, setMovieRuntime] = useState(0);
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    if (props.selectedMovieData) {
      fetchAdditionalData();
      fetchTrailer();
    }
  }, [props.selectedMovieData]);

  const exitModal = () => {
    setMovieGenres([]);
    setMovieRuntime(0);
    setTrailerKey("");
    props.setSelectedMovieData(null);
  };

  const setGenres = (genresList) => {
    let genresToAdd = [];
    genresList.forEach((genre) => {
      genresToAdd.push(genre.name);
    });
    setMovieGenres(genresToAdd);
  };

  const fetchAdditionalData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${props.selectedMovieData?.id}?language=en-US`,
        props.options
      );

      if (response?.status === 200) {
        const additionalMovieData = await response.json();
        setMovieRuntime(additionalMovieData.runtime);
        setGenres(additionalMovieData.genres);
      } else {
        exitModal();
        console.error("Error: ", response?.statusText);
      }
    } catch (err) {
      exitModal();
      console.error("Error fetching movie");
    }
  };

  const fetchTrailer = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${props.selectedMovieData?.id}/videos?language=en-US`,
        props.options
      );

      if (response?.status === 200) {
        const videoData = await response.json();
        let trailer = videoData?.results.find((video) =>
          video.name.includes("Official Trailer")
        );
        // Aim to find official/main trailer, otherwise find any trailer offered
        if (!trailer) {
          trailer = videoData?.results.find((video) =>
            video.name.includes("Trailer")
          );
        }
        setTrailerKey(trailer ? trailer.key : "");
      } else {
        exitModal();
        console.error("Error: ", response?.statusText);
      }
    } catch (err) {
      exitModal();
      console.error("Error fetching movie");
    }
  };

  return (
    <div
      className="modal-container"
      style={{ display: props.selectedMovieData ? "flex" : "none" }}
      onClick={(event) =>
        event.target.className === "modal-container" ? exitModal() : null
      }
    >
      <div className="modal">
        <span class="modal-exit material-symbols-outlined" onClick={exitModal}>
          close
        </span>
        <img
          src={`https://image.tmdb.org/t/p/original/${props.selectedMovieData?.backdrop_path}`}
          alt={`${props.selectedMovieData?.title} Backdrop Image`}
          className="modal-backdrop"
        />
        <h2 style={{ alignSelf: "center" }}>
          {props.selectedMovieData?.title}
        </h2>
        <section className="modal-summary">
          <div style={{ width: "55%" }}>
            <h3>Release Date</h3>
            <h4>{props.selectedMovieData?.release_date}</h4>
            <h3>Genres</h3>
            <h4>
              {movieGenres.map((genre, index) =>
                index !== movieGenres.length - 1 ? `${genre}, ` : `${genre}`
              )}
            </h4>
            <h3>Runtime</h3>
            <h4>{movieRuntime} minutes</h4>
            <h3>Overview</h3>
            <h5 className="modal-overview">
              {props.selectedMovieData?.overview}
            </h5>
          </div>
          <img
            src={`https://image.tmdb.org/t/p/original/${props.selectedMovieData?.poster_path}`}
            alt={`${props.selectedMovieData?.title} Poster Image`}
            className="modal-poster"
          />
        </section>
        <section style={{ width: "100%" }}>
          <h3>Trailer</h3>
          {trailerKey ? (
            <iframe
              width="420"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              allowFullScreen
              className="modal-trailer"
            ></iframe>
          ) : (
            <h4>No trailer has been found for this movie</h4>
          )}
        </section>
      </div>
    </div>
  );
};

export default MovieModal;
