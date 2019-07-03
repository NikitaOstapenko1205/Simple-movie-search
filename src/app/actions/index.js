import axios from 'axios';
import { createAction } from 'redux-actions';

export const fetchMoviesRequest = createAction('MOVIES_FETCH_REQUEST');
export const fetchMoviesSuccess = createAction('MOVIES_FETCH_SUCCESS');
export const fetchSingleMovieSuccess = createAction('MOVIE_SINGLE_FETCH_SUCCESS');
export const fetchMoviesFailure = createAction('MOVIES_FETCH_FAILURE');
export const updateSearchField = createAction('MOVIES_SEARCH_UPDATE');
export const closeModalWindow = createAction('MODAL_WINDOW_CLOSE');

export const fetchMovies = ({ search }) => async dispatch => {
  dispatch(fetchMoviesRequest());
  try {
    const url = `http://www.omdbapi.com/?apikey=9e7bd865&s=${search}&type=movie`;
    const response = await axios.get(url);
    dispatch(fetchMoviesSuccess({ movies: response.data.Search }));
  } catch (e) {
    dispatch(fetchMoviesFailure());
    throw e;
  }
};

export const fetchSingleMovie = ({ id }) => async dispatch => {
  dispatch(fetchMoviesRequest());
  try {
    const url = `http://www.omdbapi.com/?apikey=9e7bd865&i=${id}&plot=full`;
    const response = await axios.get(url);
    dispatch(fetchSingleMovieSuccess({ movie: response.data }));
  } catch (e) {
    dispatch(fetchMoviesFailure());
    throw e;
  }
};
