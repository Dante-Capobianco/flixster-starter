import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = (props) => {
  const [fetchedPage, setFetchedPage] = useState(1);
  const [disableLoadMore, setDisableLoadMore] = useState(false);
  const [alreadySearched, setAlreadySearched] = useState(false);

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

      if (response.status === 200) {
        const movies = await response.json();

        if (fetchedPage === movies.total_pages) setDisableLoadMore(true);
        if (props.moviesData?.length === 0) setAlreadySearched(true);

        props.setMoviesData([...props.moviesData, ...movies.results]);

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

  return (
    <>
      <section className="movie-list">
        {props.moviesData.length > 0
          ? props.moviesData.map((movie, index) => (
              <MovieCard
                key={index}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={`${movie.title} Poster Image`}
                title={movie.title}
                vote_average={movie.vote_average}
                setSelectedMovieData={props.setSelectedMovieData}
                movieData={movie}
              />
            ))
          : <h3>No movies found</h3>}
      </section>

      <button
        disabled={disableLoadMore}
        className="load-more-btn"
        onClick={() => {
          setFetchedPage(fetchedPage + 1);
        }}
      >
        Load More
      </button>
    </>
  );
};

export default MovieList;
