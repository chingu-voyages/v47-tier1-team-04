import React, { useState } from "react";

function Search({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search by task name, category, group, etc..."
        id="search"
        className="btn"
        value={search}
        onChange={handleSearchChange}
      />
      <i className="fa-solid fa-magnifying-glass fa-lg search-icon" />
    </div>
  );
}

export default Search;
