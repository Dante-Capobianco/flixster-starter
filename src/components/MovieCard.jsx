const MovieCard = (props) => {
  return (
    <article className="movie-card" onClick={() => props.setSelectedMovieData(props.movieData)}>
      <img
        src={props.src}
        alt={props.alt}
        className="movie-card-poster"
      />
      {/* todo: https://docs.google.com/document/d/1zdT1PrCLJ-UU60-sMpy_jReyd3tehnzBKxdxPFKIO7g/edit?usp=sharing */}
      <h2 className="movie-card-title">{props.title}</h2>
      <h3 className="movie-card-rating">Rating: {props.vote_average}</h3>
    </article>
  );
};

export default MovieCard;
