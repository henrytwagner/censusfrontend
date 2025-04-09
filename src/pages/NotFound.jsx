import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.message}>
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link to="/" style={styles.link}>
        Go back home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '4rem',
  },
  heading: {
    fontSize: '6rem',
    margin: 0,
  },
  message: {
    fontSize: '1.25rem',
    margin: '1rem 0',
  },
  link: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default NotFound;
