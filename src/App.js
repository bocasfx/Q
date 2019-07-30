import React from 'react';
import Main from './components/Main/Main';
import { Provider } from 'react-redux';
import store from './app/Store';

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;