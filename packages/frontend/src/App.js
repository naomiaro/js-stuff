import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import RepoList from './containers/RepoList';
import ErrorBoundary from './components/ErrorBoundary';
import rootReducer from './reducers';

const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));

const App = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <RepoList username="naomiaro" />
    </ErrorBoundary>
  </Provider>
);

export default App;
