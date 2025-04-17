import React from 'react';
import ContactList from '../components/ContactList';
import Empty from '../components/Empty';
import GeneralContactList from '../components/GeneralContactList';

const Home = () => {
  return (
    <>
      <GeneralContactList />
      <Empty />
    </>
  );
};

export default Home;
