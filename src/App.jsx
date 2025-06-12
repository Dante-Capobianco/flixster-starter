import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieModal from "./components/MovieModal";

const App = () => {
  const [sortingMethod, setSortingMethod] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchQueryToSubmit, setSearchQueryToSubmit] = useState("");
  const [footerHeight, setFooterHeight] = useState(0);
  const [moviesData, setMoviesData] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [selectedMovieData, setSelectedMovieData] = useState(null);

  const movieTileHeight = window.innerHeight * 0.75; // 75vh
  const titleIconSize = "30px";
  const titleIconAlt = "Movie recording device icon";
  const titleIconSrc = "/movie.png";
  const submit = "submit";
  const sortByRating = "rating";
  const sortByDate = "date";
  const sortByTitle = "title";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
    },
  };

  const moviesSame = (newMovieList) => {
    if (newMovieList.length !== moviesData.length) return false;
    return newMovieList.every(
      (movie, index) => movie.id === moviesData[index].id
    );
  };

  useEffect(() => {
    let newMovieList;
    switch (sortingMethod) {
      case sortByRating:
        newMovieList = moviesData.toSorted((movieA, movieB) => {
          const sortOrder = movieB.vote_average - movieA.vote_average;
          if (sortOrder === 0) {
            return movieA.title.localeCompare(movieB.title);
          }
          return sortOrder;
        });
        break;

      case sortByDate:
        newMovieList = moviesData.toSorted((movieA, movieB) =>
          movieB.release_date.localeCompare(movieA.release_date)
        );
        break;

      case sortByTitle:
        newMovieList = moviesData.toSorted((movieA, movieB) =>
          movieA.title.localeCompare(movieB.title)
        );
        break;
    }
    if (sortingMethod && !moviesSame(newMovieList)) setMoviesData(newMovieList);
  }, [sortingMethod, moviesData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("submit-search-btn").blur();
    setSearchQueryToSubmit(searchValue);
  };

  const handleClear = (event) => {
    event.preventDefault();
    document.getElementById("clear-search-btn").blur();
    setSearchValue("");
    setSearchQueryToSubmit("");
  };

  // On initial render, get header/banner height to dynamically set height of footer to be responsive
  useEffect(() => {
    let height =
      window.innerHeight -
      document.getElementById("app-header")?.offsetHeight -
      movieTileHeight;
    setFooterHeight(height > 50 ? height : 50);
  }, []);

  return (
    <div className="App">
      <header id="app-header" className="App-header">
        <h1 className="title">
          <img src={titleIconSrc} alt={titleIconAlt} width={titleIconSize} />{" "}
          Flixster{" "}
          <img src={titleIconSrc} alt={titleIconAlt} width={titleIconSize} />
        </h1>
        <p style={{ fontFamily: "fantasy" }}>
          Your go-to tool to find any movies
        </p>

        <section className="header-search-sort">
          <form>
            <input
              type="text"
              class="search-bar"
              placeholder={
                window.innerWidth >= 500 ? "Search for a movie title" : "Search"
              }
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="search-btn-container">
              <button
                type={submit}
                onClick={(event) => handleSubmit(event)}
                id="submit-search-btn"
                className="search-btn"
              >
                Search
              </button>
              <button
                type={submit}
                onClick={(event) => handleClear(event)}
                id="clear-search-btn"
                className="search-btn"
              >
                Clear
              </button>
            </div>
          </form>

          <select
            value={sortingMethod}
            className="sort-options"
            onChange={(event) => setSortingMethod(event.target.value)}
          >
            <option value="" disabled>
              {window.innerWidth >= 500 ? "Choose a sorting method" : "Sort"}
            </option>
            <option value={sortByRating}>Rating (Highest -&gt; Lowest)</option>
            <option value={sortByDate}>
              Release Date (Recent -&gt; Oldest)
            </option>
            <option value={sortByTitle}>Title (Alphabetically, A-Z)</option>
          </select>
        </section>
      </header>

      <main>
        <MovieList
          options={options}
          setSelectedMovieData={setSelectedMovieData}
          moviesData={moviesData}
          setMoviesData={setMoviesData}
          searchQuery={searchQueryToSubmit}
          favoriteMovies={favoriteMovies}
          setFavoriteMovies={setFavoriteMovies}
          watchedMovies={watchedMovies}
          setWatchedMovies={setWatchedMovies}
        />
      </main>
      <MovieModal
        options={options}
        setSelectedMovieData={setSelectedMovieData}
        selectedMovieData={selectedMovieData}
      />

      <footer style={{ height: footerHeight }}>
        <h4>&copy; 2025 Flixster</h4>
      </footer>
    </div>
  );
};

export default App;
