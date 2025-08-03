import React from 'react';

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <span
        className="loading loading-spinner loading-lg"
        role="status"
        aria-label="Loading"
      ></span>
    </div>
  );
};

export default Loading;