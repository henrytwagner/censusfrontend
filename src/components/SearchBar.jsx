import React from 'react';
import '../styles/searchbar.css';
import SearchIcon from './SearchIcon';

const SearchBar = () => {
  return (
    <form className="search-bar cursor-text" role="search">
      <div className="search-content">
        <SearchIcon className="search-icon" />
        <input type="text" className="search-text" placeholder="Search" />
      </div>
    </form>
  );
};

export default SearchBar;
