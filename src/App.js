import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import { Provider } from 'react-redux';
import store from './app/Store';

const App = () => (
  <Provider store={store}>
    <Switch>
      <Route exact path='/' component={Main}/>
    </Switch>
  </Provider>
);

export default App;