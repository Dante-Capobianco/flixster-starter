import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieModal from "./components/MovieModal";
import {
  sortMoviesByRating,
  moviesSame,
  sortMoviesByDate,
  sortMoviesByTitle,
} from "./utils/utils";

const App = () => {
  // Constants, avoiding magic numbers/strings
  const movieTileHeight = window.innerHeight * 0.75; // 75vh
  const titleIconSize = "30px";
  const titleIconAlt = "Movie recording device icon";
  const titleIconSrc = "/movie.png";
  const submit = "submit";
  const sortByRating = "rating";
  const sortByDate = "date";
  const sortByTitle = "title";
  const home = "Home";
  const favorites = "Favorites";
  const watched = "Watched";

  // API fetch configuration
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
    },
  };

  const [sortingMethod, setSortingMethod] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchQueryToSubmit, setSearchQueryToSubmit] = useState("");
  const [footerHeight, setFooterHeight] = useState(0);
  const [moviesData, setMoviesData] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [selectedMovieData, setSelectedMovieData] = useState(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(home);

  // On initial render, use header/banner, tile list, and window heights to dynamically set height of footer to be responsive
  useEffect(() => {
    let height =
      window.innerHeight -
      document.getElementById("app-header")?.offsetHeight -
      movieTileHeight;
    setFooterHeight(height > 50 ? height : 50);
  }, []);

  // Update ordering of movies based on selected sorting method
  useEffect(() => {
    let newMovieList;
    switch (sortingMethod) {
      case sortByRating:
        newMovieList = sortMoviesByRating(moviesData);
        break;

      case sortByDate:
        newMovieList = sortMoviesByDate(moviesData);
        break;

      case sortByTitle:
        newMovieList = sortMoviesByTitle(moviesData);
        break;
    }
    if (sortingMethod && !moviesSame(moviesData, newMovieList))
      setMoviesData(newMovieList);
  }, [sortingMethod, moviesData]);

  // Update search query used to filter movies by once user clicks submit button
  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("submit-search-btn").blur();
    setSearchQueryToSubmit(searchValue);
  };

  // Clear search query to reset movies by now playing once user clicks clear button
  const handleClear = (event) => {
    event.preventDefault();
    document.getElementById("clear-search-btn").blur();
    setSearchValue("");
    setSearchQueryToSubmit("");
  };

  return (
    <div className="App">
      <header id="app-header" className="App-header">
        <h1 className="title">
          <img src={titleIconSrc} alt={titleIconAlt} width={titleIconSize} />
          Flixster
          <img src={titleIconSrc} alt={titleIconAlt} width={titleIconSize} />
        </h1>
        <p style={{ fontFamily: "fantasy" }}>
          Your go-to tool to find any movies
        </p>

        <section className="header-search-sort">
          <span
            class="sidebar-icon material-symbols-outlined"
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          >
            {isSideBarOpen ? "density_medium" : "menu"}
          </span>
          <form style={{ display: currentPage !== home ? "none" : "" }}>
            <input
              type="text"
              class="search-bar"
              // Reduce placeholder text length to fit on smaller devices
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
            style={{ display: currentPage !== home ? "none" : "" }}
          >
            <option value="" disabled>
              {/* Reduce placeholder text length to fit on smaller devices */}
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
        <nav
          className="sidebar-container"
          style={{
            left: isSideBarOpen ? 0 : "-20vw",
            boxShadow: isSideBarOpen ? "20px 0px 40px black" : "",
          }}
        >
          <ul className="sidebar-options">
            <li
              className={`sidebar-option ${
                currentPage === home ? "current-page" : ""
              }`}
              onClick={() => setCurrentPage(home)}
            >
              {home}
            </li>
            <li
              className={`sidebar-option ${
                currentPage === favorites ? "current-page" : ""
              }`}
              onClick={() => setCurrentPage(favorites)}
            >
              {favorites}
            </li>
            <li
              className={`sidebar-option ${
                currentPage === watched ? "current-page" : ""
              }`}
              onClick={() => setCurrentPage(watched)}
            >
              {watched}
            </li>
          </ul>
        </nav>
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
          currentPage={currentPage}
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
