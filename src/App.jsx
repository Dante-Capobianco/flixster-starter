import { useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";

const App = () => {
  return (
    <div className="App">
      <header></header>
      <main></main>
      {/* modal pop-up goes outside main */}
      <footer></footer>
    </div>
  );
};

export default App;

//todo: use button in index.css, while rest of stiles in App.css
