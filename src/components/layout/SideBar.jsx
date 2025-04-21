import React from 'react';

const SideBar = () => {
  return (
    <aside className="text-black w-52 p-4 border-r border-gray-300 h-full">
      <button
        className="flex items-center justify-start w-full px-4 py-2 border-b border-gray-200 hover:bg-gray-200 hover:font-semibold transition-all"
        onClick={() => console.log('Home clicked')}
      >
        Home
      </button>
      <button
        className="flex items-center justify-start w-full px-4 py-2 border-b border-gray-200 hover:bg-gray-200 hover:font-semibold transition-all"
        onClick={() => console.log('Dashboard clicked')}
      >
        Dashboard
      </button>
      <button
        className="flex items-center justify-start w-full px-4 py-2 border-b border-gray-200 hover:bg-gray-200 hover:font-semibold transition-all"
        onClick={() => console.log('Organizations clicked')}
      >
        Organizations
      </button>
      <button
        className="flex items-center justify-start w-full px-4 py-2 border-b border-gray-200 hover:bg-gray-200 hover:font-semibold transition-all"
        onClick={() => console.log('Options clicked')}
      >
        Options
      </button>
      <button
        className="flex items-center justify-start w-full px-4 py-2 border-b border-gray-200 hover:bg-gray-200 hover:font-semibold transition-all"
        onClick={() => console.log('Profile clicked')}
      >
        Profile
      </button>
      <button
        className="flex items-center justify-start w-full px-4 py-2 border-b border-gray-200 hover:bg-gray-200 hover:font-semibold transition-all"
        onClick={() => console.log('Search clicked')}
      >
        Search
      </button>
    </aside>
  );
};

export default SideBar;
