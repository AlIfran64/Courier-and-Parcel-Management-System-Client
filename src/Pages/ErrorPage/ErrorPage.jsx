import React from 'react';
import error from '../../../src/assets/images/undraw_page-not-found_6wni.svg';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className="w-11/12 h-screen mx-auto flex flex-col justify-center items-center">
      <img className="w-80 mb-6" src={error} alt="Error! 404 (Page not found)" />
      <p className="text-xl mb-6">Ops! Page not found</p>
      <Link to={'/'}>
        <button
          className="px-6 py-2 text-white rounded cursor-pointer bg-[#D3123E] hover:bg-[#d3123fbd]">
          Back to home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
