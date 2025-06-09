import { useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";

const App = () => {
  return (
    <div className="App">
      <header class="App-header">
        <h1>Flixster</h1>
        <section class="header-search-sort">
          {/* Make width of search bar & other styling identical to sorting w/ placeholder "Search for a movie title" */}
          <div>search</div>
          <select class="sort-options" id="sort-select">
            <option value="" disabled selected hidden>
              Choose a sorting method
            </option>
            <option value="date">"Date Added (Recent -&gt; Oldest)</option>
            <option value="alphabetical">Name (Alphabetical)</option>
            <option value="rating">Rating (Highest -&gt; Lowest)</option>
          </select>
        </section>
        {/* call search bar that uses search-bar class & dropdown menu components */}
      </header>
      <main>
        <MovieList></MovieList>
      </main>
      {/* modal pop-up goes outside main */}
      <footer>
        <h4>
          &copy; 2025 Flixster
        </h4>
      </footer>
    </div>
  );
};

export default App;

//todo: use button in index.css, while rest of stiles in App.css
//todo: use form/input/button for search bar
// use nav for sidebar
