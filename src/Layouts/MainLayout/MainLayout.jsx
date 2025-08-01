import React, { useEffect } from 'react';
import Navbar from '../../Components/Header/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';


const MainLayout = () => {

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);


  return (
    <div>
      <Navbar></Navbar>

      <div className='min-h-screen mt-16'>
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;