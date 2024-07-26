import React from 'react';

const FilterAndSort = ({ setFilter, setSort }) => {
  return (
    <div className="filter-sort">
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="api">API</option>
        <option value="database">Database</option>
        {/* Add more filters as needed */}
      </select>
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort by</option>
        <option value="name-asc">Name Ascending</option>
        <option value="name-desc">Name Descending</option>
        <option value="attack-asc">Attack Ascending</option>
        <option value="attack-desc">Attack Descending</option>
      </select>
    </div>
  );
};

export default FilterAndSort;
