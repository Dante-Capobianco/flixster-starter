import { moviesSame } from "../utils/utils";

// Test function's ability to identify differences in movie lists, even if simply ordering differences
test("moviesSame util function", () => {
  const originalMoviesList = [
    { id: "123"}, {id: "342"}, {id: "10342"}, {id: "90213"}, {id: "8293" },
  ];
  const newMoviesList = [
    { id: "10342"}, {id: "342"}, {id: "123"}, {id: "90213"}, {id: "8293" },
  ];

  expect(moviesSame(originalMoviesList, newMoviesList)).toBe(false);
});
