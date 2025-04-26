import React from 'react';
import SearchIcon from '@components/ui/SearchIcon';

const SearchBar = () => {
  return (
    <form
      className="flex w-full h-6 items-center gap-5 rounded-md bg-gray-200 focus-within:outline-2 focus-within:outline-blue-500"
      role="search"
    >
      <label
        htmlFor="search-input"
        className="flex justify-start items-center w-full h-full"
      >
        <SearchIcon className="p-1 fill-black h-full aspect-square box-border" />
        <input
          type="text"
          id="search-input"
          className="p-0 w-full h-full border-none outline-none bg-transparent shadow-none font-inherit text-inherit"
          placeholder="Search"
        />
      </label>
    </form>
  );
};

export default SearchBar;
