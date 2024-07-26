import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import LandingPage from './views/landing/landing.component';
import HomePage from './views/home/home.component';
import DetailPage from './views/detail/detail.component';
import CreatePage from './views/create/create.component';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/detail/:id" component={DetailPage} />
          <Route path="/create" component={CreatePage} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
