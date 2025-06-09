import { useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";

const App = () => {
  const [sortingMethod, setSortingMethod] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event, submitOrClear) => {
    event.preventDefault();
    if (submitOrClear === "submit") {
      document.getElementById("submit-search-btn").blur();
      if (searchValue.length === 0) {
        //go back to now playing
      } else {
        //rest of logic
      }
    } else {
      setSearchValue("");
      document.getElementById("clear-search-btn").blur();
      // go back to now playing
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ margin: 0 }}>Flixster</h1>
        <p>Your go-to tool to find any movies</p>

        <section className="header-search-sort">
          {/* use form/input/button, Make width of search bar & other styling identical to sorting */}
          <form>
            <input
              type="text"
              class="search-bar"
              placeholder="Search for a movie title"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
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
          </form>

          <select
            value={sortingMethod}
            className="sort-options"
            onChange={(selection) => setSortingMethod(selection.target.value)}
          >
            <option value="" disabled>
              Choose a sorting method
            </option>
            <option value="rating">Rating (Highest -&gt; Lowest)</option>
            <option value="date">"Date Added (Recent -&gt; Oldest)</option>
            <option value="alphabetical">Name (Alphabetical)</option>
          </select>
        </section>
      </header>

      <main>
        <MovieList name={"HELLO"} />
      </main>

      {/* modal pop-up goes outside main */}
      <footer>
        <h4>&copy; 2025 Flixster</h4>
      </footer>
    </div>
  );
};

export default App;

// use nav for sidebar
