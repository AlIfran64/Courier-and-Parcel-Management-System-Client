import React from 'react';
import forbidden from '../../../src/assets/images/undraw_cancel_7zdh.svg';
import { Link } from 'react-router';

const Forbidden = () => {
  return (
    <div className="w-11/12 h-screen mx-auto flex flex-col justify-center items-center">
      <img className="w-80 mb-6" src={forbidden} alt="Forbidden Access" />
      <p className="text-xl mb-6">Ops! Forbidden Access</p>
      <Link to="/">
        <button
          className="px-6 py-2 text-white rounded bg-[#D3123E] hover:bg-[#d3123fd2] cursor-pointer">
          Back to home
        </button>
      </Link>
    </div>
  );
};

export default Forbidden;
