import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = (props) => {
  const [fetchedPage, setFetchedPage] = useState(1);
  const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState(false);
  const [isAlreadySearched, setIsAlreadySearched] = useState(false);
  const [moviesToDisplay, setMoviesToDisplay] = useState(props.moviesData);
  const success = 200;

  const handleFailedFetch = () => {
    props.setMoviesData([]);
    setFetchedPage(1);
    setIsLoadMoreDisabled(true);
    setIsAlreadySearched(true);
  };

  // Fetch a page of now playing movies or movies by search term
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
        const nonDuplicatedNewMovies = movies.results.filter(
          (movie) => !existingMovieIds.some((id) => id === movie.id)
        );

        if (fetchedPage === movies.total_pages) setIsLoadMoreDisabled(true);
        setIsAlreadySearched(true);

        props.setMoviesData([...props.moviesData, ...nonDuplicatedNewMovies]);

        // Additional functionality: https://docs.google.com/document/d/1zdT1PrCLJ-UU60-sMpy_jReyd3tehnzBKxdxPFKIO7g/edit?usp=sharing
      } else {
        handleFailedFetch();
        console.error("Error: ", response.statusText);
      }
    } catch (err) {
      handleFailedFetch();
      console.error("Error fetching movie list");
    }
  };

  // Fetch next page of movies once user clicks load more
  useEffect(() => {
    if (fetchedPage !== 1) fetchMovies();
  }, [fetchedPage]);

  // Fetch initial page of movies
  useEffect(() => {
    // isAlreadySearched handles edge case where infinite loop calling fetchMovies when no movies are found
    if (
      props.moviesData?.length === 0 &&
      fetchedPage === 1 &&
      !isAlreadySearched
    )
      fetchMovies();
  }, [props.moviesData, fetchedPage]);

  // Trigger fetching new list of movies once search query changes
  useEffect(() => {
    setFetchedPage(1);
    props.setMoviesData([]);
    setIsLoadMoreDisabled(false);
    setIsAlreadySearched(false);
  }, [props.searchQuery]);

  // Determine which movies list to display based on current page navigated to
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
  }, [
    props.currentPage,
    props.moviesData,
    props.favoriteMovies,
    props.watchedMovies,
  ]);

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
              isMovieFavorited={props.favoriteMovies.some(
                (favoriteMovie) => favoriteMovie.id === movie.id
              )}
              isMovieWatched={props.watchedMovies.some(
                (watchedMovie) => watchedMovie.id === movie.id
              )}
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
          <h2>No movies found</h2>
        )}
      </section>

      <button
        disabled={isLoadMoreDisabled}
        className="load-more-btn"
        onClick={() => {
          setFetchedPage(fetchedPage + 1);
        }}
        style={{ display: props.currentPage !== "Home" ? "none" : "" }}
      >
        Load More
      </button>
    </>
  );
};

export default MovieList;
