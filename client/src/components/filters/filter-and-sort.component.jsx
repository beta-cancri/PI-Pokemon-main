import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './filter-and-sort.styles.css'; 

const typeImages = {
  normal: 'https://i.imgur.com/Lbdodvd.png',
  fire: 'https://i.imgur.com/HX0e6cR.png',
  water: 'https://i.imgur.com/YbRxT4V.png',
  grass: 'https://i.imgur.com/gUKk5Ik.png',
  rock: 'https://i.imgur.com/IP2mQeI.png',
  steel: 'https://i.imgur.com/IOjkJ1C.png',
  psychic: 'https://i.imgur.com/0uikIqg.png',
  poison: 'https://i.imgur.com/YYKiOA1.png',
  fighting: 'https://i.imgur.com/3Uz1rIH.png',
  flying: 'https://i.imgur.com/cKrcb8U.png',
  ground: 'https://i.imgur.com/pDGN8Rf.png',
  bug: 'https://i.imgur.com/sQVfDgc.png',
  ghost: 'https://i.imgur.com/OsVFeqL.png',
  fairy: 'https://i.imgur.com/qoXOnXH.png',
  unknown: 'https://i.imgur.com/TKaaKZg.png',
  dark: 'https://i.imgur.com/t9Hb89A.png',
  dragon: 'https://i.imgur.com/3dsst6S.png',
  ice: 'https://i.imgur.com/rDBPlbV.png',
  electric: 'https://i.imgur.com/Nd9pGpY.png',
  stellar: 'https://i.imgur.com/eMWxTmI.png',
};

const FilterAndSort = ({ setFilter, setSort, setTypeFilter }) => {
  const [types, setTypes] = useState([]);
  const [filter, setFilterState] = useState('');
  const [sort, setSortState] = useState('');
  const [type, setTypeState] = useState('');

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/types');
        setTypes(response.data);
      } catch (error) {
        console.error('Error fetching types:', error.message);
      }
    };

    fetchTypes();
  }, []);

  const handleReset = () => {
    setFilterState('');
    setSortState('');
    setTypeState('');
    setFilter('');
    setSort('');
    setTypeFilter('');
  };

  return (
    <div className="filter-sort">
      <select
        className="filter-select"
        value={filter}
        onChange={(e) => {
          setFilterState(e.target.value);
          setFilter(e.target.value);
        }}
      >
        <option value="">All</option>
        <option value="api">API</option>
        <option value="database">Database</option>
      </select>
      <select
        className="filter-select"
        value={sort}
        onChange={(e) => {
          setSortState(e.target.value);
          setSort(e.target.value);
        }}
      >
        <option value="">Sort by</option>
        <option value="name-asc">Name Ascending</option>
        <option value="name-desc">Name Descending</option>
        <option value="attack-asc">Attack Ascending</option>
        <option value="attack-desc">Attack Descending</option>
      </select>
      <div className="dropdown">
        <button className="filter-select dropdown-toggle" role="button">
          {type || 'All Types'}
        </button>
        <div className="dropdown-menu">
          <div className="dropdown-item" onClick={() => { setTypeState(''); setTypeFilter(''); }}>
            <span>All Types</span>
          </div>
          {types.map((type) => (
            <div
              key={type.id}
              className="dropdown-item"
              onClick={() => { setTypeState(type.name); setTypeFilter(type.name); }}
            >
              <img src={typeImages[type.name]} alt={type.name} className="type-icon" />
              <span>{type.name}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default FilterAndSort;
