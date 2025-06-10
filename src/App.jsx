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
  const [selectedMovieData, setSelectedMovieData] = useState(null);
  const movieTileHeight = window.innerHeight * 0.75; // 75vh

  const handleSearch = (event, submitOrClear) => {
    event.preventDefault();
    if (submitOrClear === "submit") {
      document.getElementById("submit-search-btn").blur();
      setSearchQueryToSubmit(searchValue);
    } else {
      document.getElementById("clear-search-btn").blur();
      setSearchValue("");
      setSearchQueryToSubmit("");
    }
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
        <h1 style={{ margin: 0 }}>Flixster</h1>
        <p>Your go-to tool to find any movies</p>

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
                type="submit"
                onClick={(e) => handleSearch(e, "submit")}
                id="submit-search-btn"
                className="search-btn"
              >
                Search
              </button>
              <button
                type="submit"
                onClick={(e) => handleSearch(e, "clear")}
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
            onChange={(selection) => setSortingMethod(selection.target.value)}
          >
            <option value="" disabled>
              {window.innerWidth >= 500 ? "Choose a sorting method" : "Sort"}
            </option>
            <option value="rating">Rating (Highest -&gt; Lowest)</option>
            <option value="date">"Date Added (Recent -&gt; Oldest)</option>
            <option value="alphabetical">Name (Alphabetical)</option>
          </select>
        </section>
      </header>

      <main>
        <MovieList setSelectedMovieData={setSelectedMovieData} moviesData={moviesData} setMoviesData={setMoviesData} searchQuery={searchQueryToSubmit} />
      </main>
      <MovieModal selectedMovieData={selectedMovieData} />

      {/* todo: https://docs.google.com/document/d/1zdT1PrCLJ-UU60-sMpy_jReyd3tehnzBKxdxPFKIO7g/edit?tab=t.0 */}
      <footer style={{ height: footerHeight }}>
        <h4>&copy; 2025 Flixster</h4>
      </footer>
    </div>
  );
};

export default App;
