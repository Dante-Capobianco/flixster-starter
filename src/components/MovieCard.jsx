const MovieCard = (props) => {
  // Handle movie tile click, whether selecting favorite icon, watched icon, or rest of tile to open modal
  const handleMovieClick = (event) => {
    if (event.target?.innerText === "favorite") {
      toggleFavorite(event.target.classList);
    } else if (event.target?.innerText === "visibility") {
      toggleWatched(event.target.classList);
    } else {
      props.setSelectedMovieData(props.movieData);
    }
  };

  // Toggle favorite icon on selected movie & update favorited movies list
  const toggleFavorite = (heartIconClassList) => {
    if (heartIconClassList.contains("favorite")) {
      const newFavoriteMovies = props.favoriteMovies.filter(
        (favoriteMovie) => favoriteMovie.id !== props.movieData.id
      );
      props.setFavoriteMovies(newFavoriteMovies);
    } else {
      props.setFavoriteMovies([...props.favoriteMovies, props.movieData]);
    }
    heartIconClassList.toggle("favorite");
  };

  // Toggle watched icon on selected movie & update watched movies list
  const toggleWatched = (eyeIconClassList) => {
    if (eyeIconClassList.contains("watched")) {
      const newWatchedMovies = props.watchedMovies.filter(
        (watchedMovie) => watchedMovie.id !== props.movieData.id
      );
      props.setWatchedMovies(newWatchedMovies);
    } else {
      props.setWatchedMovies([...props.watchedMovies, props.movieData]);
    }
    eyeIconClassList.toggle("watched");
  };

  return (
    <article className="movie-card" onClick={handleMovieClick}>
      <img src={props.src} alt={props.alt} className="movie-card-poster" />
      <h2 className="movie-card-title">{props.title}</h2>
      <section className="rating-fav-watch-container">
        <h3 className="movie-card-rating">Rating: {props.vote_average}</h3>
        <span
          class={`${
            props.isMovieFavorited ? "favorite" : ""
          } heart material-symbols-outlined`}
        >
          favorite
        </span>
        <span
          class={`${
            props.isMovieWatched ? "watched" : ""
          } eye material-symbols-outlined`}
        >
          visibility
        </span>
      </section>
    </article>
  );
};

export default MovieCard;
