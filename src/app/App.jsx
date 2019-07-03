import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './actions';

const mapStateToProps = state => {
  return state;
};

const actionCreators = {
  updateSearchField: actions.updateSearchField,
  fetchMovies: actions.fetchMovies,
  fetchSingleMovie: actions.fetchSingleMovie,
  closeModalWindow: actions.closeModalWindow
};

class App extends React.Component {
  static propTypes = {
    fetchMovies: PropTypes.func,
    updateSearchField: PropTypes.func,
    fetchSingleMovie: PropTypes.func,
    closeModalWindow: PropTypes.func,
    search: PropTypes.string,
    moviesFetchingState: PropTypes.string,
    moviesState: PropTypes.object
  };

  updateSearch = e => {
    const { updateSearchField } = this.props;
    updateSearchField({ search: e.target.value });
  };

  findMovies = e => {
    e.preventDefault();
    const { fetchMovies, search } = this.props;
    try {
      fetchMovies({ search });
    } catch (error) {
      throw error;
    }
  };

  findMovie = id => e => {
    e.preventDefault();
    const { fetchSingleMovie } = this.props;
    try {
      fetchSingleMovie({ id });
    } catch (error) {
      throw error;
    }
  };

  addMovies = movies => {
    const htmledMovies = (
      <div className="grid">
        {movies.map(mv => (
          <div className="grid-item" key={mv.imdbID}>
            <h2 className="grid-item-title">{mv.Title}</h2>
            <button type="button" onClick={this.findMovie(mv.imdbID)}>
              <img
                className="grid-item-image"
                alt={mv.Title}
                title="Click for more information"
                src={mv.Poster === 'N/A' ? './img/no_image.png' : mv.Poster}
              />
            </button>
            <div className="grid-item-year">{mv.Year}</div>
            <a
              className="grid-item-imdb"
              rel="noreferrer noopener"
              target="_blank"
              href={`https://www.imdb.com/title/${mv.imdbID}/`}
            >
              IMDB
            </a>
          </div>
        ))}
      </div>
    );
    return htmledMovies;
  };

  closeModal = e => {
    e.preventDefault();
    const { closeModalWindow } = this.props;
    closeModalWindow();
  };

  showMovieModal = () => {
    const {
      moviesState: { movie }
    } = this.props;
    return (
      <div className="movie-modal">
        <button className="movie-modal-close" onClick={this.closeModal} type="button">
          ✖
        </button>
        <img
          className="movie-modal-image"
          alt={movie.Title}
          title={movie.Title}
          src={movie.Poster === 'N/A' ? './img/no_image.png' : movie.Poster}
        />
        <h2 className="movie-modal-title">{movie.Title}</h2>
        <div className="movie-modal-info movie-modal-date">
          <span>Released: </span>
          {movie.Released}
        </div>
        <div className="movie-modal-info movie-modal-plot">
          <span>Plot: </span>
          {movie.Plot}
        </div>
        <div className="movie-modal-info movie-modal-director">
          <span>Director: </span>
          {movie.Director}
        </div>
        <div className="movie-modal-info movie-modal-actors">
          <span>Actors: </span>
          {movie.Actors}
        </div>
        <div className="movie-modal-info movie-modal-metascore">
          <span>Metascore: </span>
          {movie.Metascore}
        </div>
        <div className="movie-modal-info movie-modal-imdbrating">
          <span>imdbRating: </span>
          {movie.imdbRating}
        </div>
      </div>
    );
  };

  render() {
    const { search, moviesFetchingState, moviesState } = this.props;
    return (
      <div>
        <form onSubmit={this.findMovies}>
          <input
            placeholder="Write the name of the film or part of it"
            type="text"
            required
            value={search}
            onChange={this.updateSearch}
          />
          <button disabled={moviesFetchingState === 'required'} type="submit" />
        </form>
        {moviesState.movies.length > 0 && this.addMovies(moviesState.movies)}
        {!moviesState.moviesFinded && (
          <h2 className="movies-error">Sorry... We found nothing, try again!</h2>
        )}
        {Object.keys(moviesState.movie).length > 0 && this.showMovieModal()}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators
)(App);
