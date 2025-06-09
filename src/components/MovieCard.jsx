import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const MovieCard = (props) => {
  return (
    <article className="movie-card">
      <img
        src={props.src}
        alt={props.alt}
        className="movie-card-poster"
      />
      {/* todo: ensure if longer than 2 lines, do ... at 2-line mark*/}
      <h2 className="movie-card-title">{props.title}</h2>
      <h3 className="movie-card-rating">Rating: {props.vote_average}</h3>
    </article>
  );
};

export default MovieCard;
