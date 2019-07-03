import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const moviesFetchingState = handleActions(
  {
    [actions.fetchMoviesRequest]() {
      return 'requested';
    },
    [actions.fetchMoviesFailure]() {
      return 'failed';
    },
    [actions.fetchMoviesSuccess]() {
      return 'finished';
    }
  },
  'none'
);

const moviesState = handleActions(
  {
    [actions.fetchMoviesSuccess](
      state,
      {
        payload: { movies }
      }
    ) {
      const newState = movies
        ? { moviesFinded: true, movies, movie: {} }
        : { moviesFinded: false, movies: [], movie: {} };
      return newState;
    },
    [actions.fetchSingleMovieSuccess](
      state,
      {
        payload: { movie }
      }
    ) {
      return { ...state, movie };
    },
    [actions.closeModalWindow](state) {
      return { ...state, movie: {} };
    }
  },
  { moviesFinded: true, movies: [], movie: {} }
);

const search = handleActions(
  {
    [actions.fetchMoviesSuccess]() {
      return '';
    },
    [actions.updateSearchField](state, { payload }) {
      return payload.search;
    }
  },
  ''
);

export default combineReducers({
  moviesFetchingState,
  moviesState,
  search
});
