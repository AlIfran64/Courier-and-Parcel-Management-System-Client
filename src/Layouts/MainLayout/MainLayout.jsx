import React from 'react';
import Navbar from '../../Components/Header/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer/Footer';

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div className='min-h-screen'>
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;