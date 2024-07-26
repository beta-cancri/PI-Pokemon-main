import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FilterAndSort = ({ setFilter, setSort, setTypeFilter }) => {
  const [types, setTypes] = useState([]);

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

  return (
    <div className="filter-sort">
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="api">API</option>
        <option value="database">Database</option>
      </select>
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort by</option>
        <option value="name-asc">Name Ascending</option>
        <option value="name-desc">Name Descending</option>
        <option value="attack-asc">Attack Ascending</option>
        <option value="attack-desc">Attack Descending</option>
      </select>
      <select onChange={(e) => setTypeFilter(e.target.value)}>
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type.id} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterAndSort;
