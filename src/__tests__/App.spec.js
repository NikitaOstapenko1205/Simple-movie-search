import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../app/App.jsx';
import reducers from '../app/reducers';
import * as actions from '../app/actions';
import store from '../index';

describe('Reducers tests', () => {
  it('Check updateSearchField reducer', () => {
    expect(reducers('', actions.updateSearchField({ search: 'lol' })).search).toBe('lol');
  });

  it('Check on fail fetchMovies reducer', () => {
    expect(reducers('', actions.fetchMoviesFailure()).moviesFetchingState).toBe('failed');
  });

  it('Check on request fethMovies reducer', () => {
    expect(reducers('', actions.fetchMoviesRequest()).moviesFetchingState).toBe('requested');
  });

  it('Check on success fethMovies reducer', () => {
    expect(reducers('', actions.fetchMoviesSuccess({ movies: [] })).moviesFetchingState).toBe(
      'finished'
    );
  });
});

describe('Component snapshot tests', () => {
  const myComponent = mount(<App store={store} />);

  it('Drawing initial state', () => {
    expect(myComponent.find('input').instance().value).toBe('');
    expect(myComponent.find('input').html()).toMatchSnapshot();
  });

  it('Change search input', () => {
    myComponent.find('input').simulate('change', { target: { value: 'lol' } });
    expect(myComponent.find('input').instance().value).toBe('lol');
    expect(myComponent.find('input').html()).toMatchSnapshot();
  });
});
