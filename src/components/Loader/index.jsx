import React from 'react';
import './index.css';

export function Loader() {
  return (
    <div className="loader">
      <h1 className="title">Loading</h1>
      <div className="rainbow-marker-loader" />
    </div>
  );
}
