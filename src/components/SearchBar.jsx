import React from 'react';
import '../styles/searchbar.css';
import SearchIcon from './SearchIcon';

const SearchBar = () => {
  return (
    <form className="search-bar cursor-text" role="search">
      <label htmlFor="search-input" className="search-content">
        <SearchIcon className="search-icon" />
        <input
          type="text"
          id="search-input"
          className="search-text"
          placeholder="Search"
        />
      </label>
    </form>
  );
};

export default SearchBar;
