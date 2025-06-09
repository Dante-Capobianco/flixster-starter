import { useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";

const App = () => {
  const [sortingMethod, setSortingMethod] = useState("")

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flixster</h1>
        <section className="header-search-sort">
          {/* use form/input/button, Make width of search bar & other styling identical to sorting w/ placeholder "Search for a movie title", call search-bar class */}
          <div>search</div>
          <select value={sortingMethod} className="sort-options" id="sort-select" onChange={(selection) => setSortingMethod(selection.target.value)}>
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
