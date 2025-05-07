import React from 'react';

const Tester = () => (
  <>
    <div className="demo-container">
      <h1>Dark Mode Demo</h1>
      <p>This component adapts automatically to your OS theme.</p>

      <button className="btn">Primary Button</button>

      <div className="card">
        <h2>Card Title</h2>
        <p>
          This is a sample card. Its background and text colors adjust based on
          light/dark mode.
        </p>
        <span className="badge">Badge</span>
      </div>
    </div>
  </>
);

export default Tester;
