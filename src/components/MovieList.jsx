import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = (props) => {
  const [fetchedPage, setFetchedPage] = useState(1);
  const [disableLoadMore, setDisableLoadMore] = useState(false);
  const [alreadySearched, setAlreadySearched] = useState(false);
  const [moviesToDisplay, setMoviesToDisplay] = useState(props.moviesData);
  const success = 200;

  const fetchMovies = async () => {
    let response;

    try {
      if (!props.searchQuery) {
        response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${fetchedPage}}`,
          props.options
        );
      } else {
        response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${props.searchQuery}&language=en-US&page=${fetchedPage}`,
          props.options
        );
      }

      if (response.status === success) {
        const movies = await response.json();
        
        // Handles API issue where identical movies found in different pages, avoiding duplicated display 
        const existingMovieIds = props.moviesData.map((movie) => movie.id);
        const nonDuplicatedNewMovies = movies.results.filter((movie) => !existingMovieIds.some((id) => id === movie.id))

        if (fetchedPage === movies.total_pages) setDisableLoadMore(true);
        setAlreadySearched(true);

        props.setMoviesData([...props.moviesData, ...nonDuplicatedNewMovies]);

        // Additional functionality: https://docs.google.com/document/d/1zdT1PrCLJ-UU60-sMpy_jReyd3tehnzBKxdxPFKIO7g/edit?usp=sharing
      } else {
        props.setMoviesData([]);
        console.error("Error: ", response.statusText);
      }
    } catch (err) {
      props.setMoviesData([]);
      console.error("Error fetching movie list");
    }
  };

  useEffect(() => {
    if (fetchedPage !== 1) fetchMovies();
  }, [fetchedPage]);

  useEffect(() => {
    // alreadySearched handles edge case where infinite loop calling fetchMovies when no movies are found
    if (props.moviesData?.length === 0 && fetchedPage === 1 && !alreadySearched) fetchMovies();
  }, [props.moviesData, fetchedPage]);

  useEffect(() => {
    setFetchedPage(1);
    props.setMoviesData([]);
    setDisableLoadMore(false);
    setAlreadySearched(false);
  }, [props.searchQuery]);

  useEffect(() => {
    switch (props.currentPage) {
      case "Home": 
        setMoviesToDisplay(props.moviesData);
        break;
      case "Favorites": 
        setMoviesToDisplay(props.favoriteMovies);
        break;
      case "Watched": 
        setMoviesToDisplay(props.watchedMovies);
        break;
    }
  }, [props.currentPage, props.moviesData, props.favoriteMovies, props.watchedMovies])

  return (
    <>
      <section className="movie-list">
        {moviesToDisplay.length > 0 ? (
          moviesToDisplay.map((movie) => (
            <MovieCard
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={`${movie.title} Poster Image`}
              title={movie.title}
              movieIsFavorited={props.favoriteMovies.some((favoriteMovie) => favoriteMovie.id === movie.id)}
              movieIsWatched={props.watchedMovies.some((watchedMovie) => watchedMovie.id === movie.id)}
              vote_average={movie.vote_average}
              setSelectedMovieData={props.setSelectedMovieData}
              movieData={movie}
              favoriteMovies={props.favoriteMovies}
              setFavoriteMovies={props.setFavoriteMovies}
              watchedMovies={props.watchedMovies}
              setWatchedMovies={props.setWatchedMovies}
            />
          ))
        ) : (
          <h3>No movies found</h3>
        )}
      </section>

      <button
        disabled={disableLoadMore}
        className="load-more-btn"
        onClick={() => {
          setFetchedPage(fetchedPage + 1);
        }}
        style={{display: props.currentPage !== "Home" ? 'none' : ''}}
      >
        Load More
      </button>
    </>
  );
};

export default MovieList;
