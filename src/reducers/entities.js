import produce from "immer";
import merge from "lodash/merge";

const initialState = {
  movies: {},
  genres: {},
  movieCredits: {},
  castCredits: {},
  people: {},
  personCredits: {},
  videos: {},
  movieVideos: {},
  movieRecommendations: {},
  images: {},
  movieImages: {},
  personImages: {}
};

const entities = (state = initialState, action) => {
  return produce(state, draft => {
    const { payload } = action;
    const entities = payload?.response?.entities;
    if (entities) {
      draft = merge(draft, entities);
    }
  });
};

// Default export is the "reducer".
export default entities;

const selectMovie = (state, movieId) => state.movies[movieId];
const selectPerson = (state, personId) => state.people[personId];

// All the named exports are "selectors" of this state slice.
// The "state" parameter here is the same state slice as the "entities" reducer itself.
// No need to use it like "state.entities...".
export const selectors = {
  selectMovie,
  selectMovies: (state, movieIds) =>
    movieIds.map(movieId => selectMovie(state, movieId)),
  selectGenre: (state, genreId) => state.genres[genreId],
  selectGenres: state => state.genres,
  selectMovieCredits: (state, movieId) => state.movieCredits[movieId],
  selectCastCredits: (state, castCreditId) => state.castCredits[castCreditId],
  selectPerson,
  selectPeople: (state, personIds) =>
    personIds.map(personId => selectPerson(state, personId)),
  selectPersonCredits: (state, personId) => state.personCredits[personId],
  selectVideo: (state, videoId) => state.videos[videoId],
  selectMovieVideos: (state, movieId) => state.movieVideos[movieId]?.videos,
  selectMovieRecommendations: (state, movieId) =>
    state.movieRecommendations[movieId]?.movies,
  selectMovieImages: (state, movieId) => state.movieImages[movieId]?.backdrops,
  selectPersonImages: (state, personId) =>
    state.personImages[personId]?.profiles
};
