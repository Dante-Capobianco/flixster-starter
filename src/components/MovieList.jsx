import React from "react";
import ReactDOM from "react-dom";

const MovieList = () => {
  const movies = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

  return (
    <>
      <section class="movie-list">
        {movies.map((movie, index) => (
          <article key={index} class="movie-card">
            <img src="" alt="" />
            <h2 class="movie-card-title">Movie Title</h2>
            <h3 class="movie-card-rating">Rating: 7.800</h3>
          </article>
        ))}
      </section>
      <button class="load-more-btn">Load More</button>
    </>
  );
};

export default MovieList;
