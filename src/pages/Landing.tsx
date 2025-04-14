import React from 'react';

const Landing = () => {
  return (
    <>
      <div className="flex-col overflow-y-auto w-full items-start">
        <div className="flex flex-col md:flex-row items-stretch bg-gray-100">
          <div className="w-full md:w-fit flex flex-col p-12 md:pl-40 md:py-20 gap-2 items-center text-center md:items-start md:text-left  z-10 ">
            <p className="text-6xl whitespace-nowrap">Not just contacts</p>
            <p className="text-9xl font-bold">context.</p>
            <p className="w-120">
              Census helps you remember what matters about the people you meet,
              so you can build deeper professional relationships — effortlessly.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold w-fit mt-8 px-6 py-3 rounded-lg shadow">
              Try It Now
            </button>
          </div>
          <div className="w-full py-2 pl-10 md:py-0 md:px-0 md:w-fill flex items-center justify-center ">
            <img className="rounded-l-3xl" src="/screenshot.png" alt="" />
          </div>
        </div>

        <div className="bg-black w-full h-700"></div>

        <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Census</h2>
              <p className="text-sm text-gray-400">
                A smarter way to remember the people you meet. Built for
                context, not just contacts.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">
                Explore
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="/features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">
                Stay Connected
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:hello@census.app"
                    className="hover:text-white"
                  >
                    hello@census.app
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
            &copy; 2025 Census. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default Landing;
