import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons } from '../../redux/actions';
import Cards from '../../components/cards/cards.component';
import Pagination from '../../components/pagination/pagination.component';
import FilterAndSort from '../../components/filters/filter-and-sort.component';
import './home.styles.css';

const HomePage = ({ search, setSearch, handleSearchSubmit }) => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchPokemons());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const applyFilter = (pokemons) => {
    let filteredPokemons = pokemons;

    if (filter === 'api') {
      filteredPokemons = filteredPokemons.filter((pokemon) => !pokemon.created);
    } else if (filter === 'database') {
      filteredPokemons = filteredPokemons.filter((pokemon) => pokemon.created);
    }

    if (typeFilter) {
      filteredPokemons = filteredPokemons.filter((pokemon) =>
        pokemon.types.includes(typeFilter)
      );
    }

    return filteredPokemons;
  };

  const applySort = (pokemons) => {
    if (sort === 'name-asc') {
      return pokemons.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'name-desc') {
      return pokemons.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === 'attack-asc') {
      return pokemons.sort((a, b) => a.attack - b.attack);
    } else if (sort === 'attack-desc') {
      return pokemons.sort((a, b) => b.attack - a.attack);
    }
    return pokemons;
  };

  // Apply search, filter, and sort
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredAndSortedPokemons = applySort(applyFilter(filteredPokemons));

  // Pagination
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredAndSortedPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Debugging logs
  console.log('Pokemons from state:', pokemons);
  console.log('Filtered Pokemons:', filteredPokemons);
  console.log('Filtered and Sorted Pokemons:', filteredAndSortedPokemons);
  console.log('Current Page Pokemons:', currentPokemons);

  return (
    <div className="home">
      <FilterAndSort setFilter={setFilter} setSort={setSort} setTypeFilter={setTypeFilter} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards pokemons={currentPokemons} />
          <Pagination
            pokemonsPerPage={pokemonsPerPage}
            totalPokemons={filteredAndSortedPokemons.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
