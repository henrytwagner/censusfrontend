import React from 'react';
import Footer from '../components/Footer';

const Landing = () => {
  return (
    <>
      <div className="flex-col overflow-y-auto w-full content-between">
        <div className="flex flex-col md:flex-row items-stretch md:justify-between bg-black">
          <div className="w-full md:w-fit flex flex-col p-12 md:pl-40 md:py-20 gap-2 items-center text-center md:items-start md:text-left text-white">
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
          <div className="pb-20 md:py-20 md:px-0 md:w-fill flex flex-row  md:flex-shrink-0 md:overflow-hidden justify-end">
            <img
              className="h-100 rounded-l-3xl"
              // OR COULD DO
              // <div className="pb-20 md:py-20 md:px-0 md:w-fill flex flex-row  md:flex-shrink-0 md:overflow-hidden justify-end">
              //   <img                      ^ with this as 0 to for full
              //     className="h-fill rounded-l-3xl"
              src="/screenshot.png"
              alt=""
            />
          </div>
        </div>

        <div className="bg-gray-300 w-full h-150"></div>

        <Footer />
      </div>
    </>
  );
};

export default Landing;
