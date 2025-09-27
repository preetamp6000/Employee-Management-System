import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="loading-spinner mx-auto mb-4"></div>
        <p className="text-gray-300 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;