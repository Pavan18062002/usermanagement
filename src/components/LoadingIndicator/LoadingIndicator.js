import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator = () => {
  return (
    <div className="loading-indicator">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <span className="loading-text">Loading...</span>
    </div>
  );
};

export default LoadingIndicator;
