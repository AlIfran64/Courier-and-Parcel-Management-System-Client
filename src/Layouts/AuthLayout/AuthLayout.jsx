import React from 'react';
import Navbar from '../../Components/Header/Navbar/Navbar';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div className='mt-16'>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayout;