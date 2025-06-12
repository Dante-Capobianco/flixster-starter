// Check if currently stored list of movies differs from newly sorted list of movies
export const moviesSame = (currentMovieList, newMovieList) => {
  if (newMovieList.length !== currentMovieList.length) return false;
  return newMovieList.every(
    (movie, index) => movie.id === currentMovieList[index].id
  );
};

// Organize movies from highest to lowest vote_average field
export const sortMoviesByRating = (movies) => {
  return movies.toSorted((movieA, movieB) => {
    const sortOrder = movieB.vote_average - movieA.vote_average;
    if (sortOrder === 0) {
      return movieA.title.localeCompare(movieB.title);
    }
    return sortOrder;
  });
};

// Organize movies from most recent to oldest release date
export const sortMoviesByDate = (movies) => {
  return movies.toSorted((movieA, movieB) =>
    movieB.release_date.localeCompare(movieA.release_date)
  );
};

// Organize movies alphabetically by title
export const sortMoviesByTitle = (movies) => {
  return movies.toSorted((movieA, movieB) =>
    movieA.title.localeCompare(movieB.title)
  );
};
