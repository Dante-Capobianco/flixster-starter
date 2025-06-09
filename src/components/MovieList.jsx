import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [movieImages, setMovieImages] = useState([]);
  const [fetchedPage, setFetchedPage] = useState(1);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
    },
  };

  //todo: make page an arg to add several (1-2, 1-3...)
  const fetchMovies = async (URL) => {
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    let response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${fetchedPage}`, options);
    if (response.status === 200) {
      const movies = await response.json();
      setMoviesData(...moviesData, movies.results);

      // Fetch movie images - extra functionality included
      let movieImagesToAdd = [];
      for await (const movie of movies.results) {
        response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/images`,
          options
        );

        if (response.status === 200) {
          const imageData = await response.json();
          movieImagesToAdd.push(imageData);
        } else {
          setMovieImages([]);
          break;
        }
      }
      setMovieImages(movieImagesToAdd);
    } else {
      setMoviesData([]);
      console.error("Error: ", response.statusText);
    }
  };

  useEffect(() => {
    console.log('hit')
    fetchMovies();
  }, [fetchedPage]);

  return (
    <>
      <section className="movie-list">
        {moviesData.length > 0 ? moviesData.map((movie, index) => (
          <MovieCard
            key={index}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={`${movie.title} Poster Image`}
            title={movie.title}
            vote_average={movie.vote_average}
          />
        )) : null}
      </section>
      {/* fix this bc it is removing all data from list */}
      <button className="load-more-btn" onClick={() => {setFetchedPage(fetchedPage + 1)}}>Load More</button>
    </>
  );
};

export default MovieList;
