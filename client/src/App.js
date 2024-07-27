import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';
import LandingPage from './views/landing/landing.component';
import HomePage from './views/home/home.component';
import DetailPage from './views/detail/detail.component';
import CreatePage from './views/create/create.component';
import Navbar from './components/navbar/navbar.component';
import { fetchPokemonByName, fetchPokemons } from './redux/actions';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

const AppContent = () => {
  const location = useLocation();
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (search) {
      console.log(`Dispatching search for: ${search}`);
      await dispatch(fetchPokemonByName(search));
    } else {
      await dispatch(fetchPokemons());
    }
  };

  const handleClearSearch = async () => {
    setSearch('');
    await dispatch(fetchPokemons());
  };

  return (
    <>
      {location.pathname !== '/' && (
        <Navbar 
          search={search} 
          setSearch={setSearch} 
          handleSearchSubmit={handleSearchSubmit} 
          handleClearSearch={handleClearSearch}
        />
      )}
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home">
          <HomePage search={search} setSearch={setSearch} handleSearchSubmit={handleSearchSubmit} />
        </Route>
        <Route path="/detail/:id" component={DetailPage} />
        <Route path="/create" component={CreatePage} />
      </Switch>
    </>
  );
};

export default App;
