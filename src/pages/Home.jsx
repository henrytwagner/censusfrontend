import React from 'react';
import ContactList from '../components/ContactList';
import Empty from '../components/Empty';

const Home = () => {
  return (
    <>
      <ContactList />
      <Empty />
    </>
  );
};

export default Home;
