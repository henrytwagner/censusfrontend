import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Census</h2>
          <p className="text-sm text-gray-400">
            A smarter way to remember the people you meet. Built for context,
            not just contacts.
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
              <a href="mailto:hello@census.app" className="hover:text-white">
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
  );
};

export default Footer;
