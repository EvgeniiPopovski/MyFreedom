import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { ConnectedCounterForm } from './components/AddCounterForm/ConnectedCounterForm';
import { ConnectedHomePage } from './components/HomePage/ConnectedHomePage';
import { store } from './redux/redux-store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/home' />
          </Route>
          <Route exact path='/home'>
            <ConnectedHomePage />
          </Route>

          <Route exact path='/addCounter'>
            <ConnectedCounterForm />
          </Route>

          <Route>
            <h1>
              Ooops... not found... sorry guys
            </h1>
          </Route>
        </Switch>
        <Link to='/addCounter'>Add Counter</Link>
      </Provider>
    </BrowserRouter>

  );
}

export default App;
