import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import Mixer from './components/Mixer/Mixer';
import { Provider } from 'react-redux';
import store from './app/Store';

const App = () => (
  <Provider store={store}>
    <Switch>
      <Route exact path='/' component={Main}/>
      <Route exact path='/mixer' component={Mixer}/>
    </Switch>
  </Provider>
);

export default App;