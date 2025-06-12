import renderer from "react-test-renderer";
import MovieCard from "../components/MovieCard";

it("should format movie tile correctly", () => {
  const tree = renderer
    .create(
      <MovieCard
        key={123}
        src="https://image.tmdb.org/t/p/w500//lbimIPTVsSlnmqSW5ngEsUxtHLM.jpg"
        alt="Movie Poster Image"
        title="Movie Title"
        isMovieFavorited={false}
        isMovieWatched={false}
        vote_average={"7.95"}
        setSelectedMovieData={() => {}}
        movieData={{id: '123'}}
        favoriteMovies={[]}
        setFavoriteMovies={() => {}}
        watchedMovies={[]}
        setWatchedMovies={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
