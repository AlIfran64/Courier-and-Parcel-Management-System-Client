import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../../../src/assets/images/Transparent logo.png';
import { useTranslation } from 'react-i18next';
import { FaFlagUsa } from 'react-icons/fa';
import { MdLanguage } from 'react-icons/md';


const Navbar = () => {

  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState(true);

  const links = <>
    <NavLink className={({ isActive }) => isActive ? "mx-1 bg-[#D3123E] text-white px-2 py-0.5 rounded-full font-medium" : "mx-1 px-2 py-0.5 font-medium"} to={'/'}>{t('home')}</NavLink>
    <NavLink className={({ isActive }) => isActive ? "mx-1 bg-[#D3123E] text-white rounded-full px-2 py-0.5 font-medium" : "mx-1 px-2 py-0.5 font-medium"} to={'/bookParcel'}>{t('bookParcel')}</NavLink>
    <NavLink className={({ isActive }) => isActive ? "mx-1 bg-[#D3123E] text-white rounded-full px-2 py-0.5 font-medium" : "mx-1 px-2 py-0.5 font-medium"} to={'/bookingHistory'}>{t('bookingHistory')}</NavLink>
    <NavLink className={({ isActive }) => isActive ? "mx-1 bg-[#D3123E] text-white rounded-full px-2 py-0.5 font-medium" : "mx-1 px-2 py-0.5 font-medium"} to={'/trackParcel'}>{t('trackParcel')}</NavLink>
    <NavLink className={({ isActive }) => isActive ? "mx-1 bg-[#D3123E] text-white rounded-full px-2 py-0.5 font-medium" : "mx-1 px-2 py-0.5 font-medium"} to={'/beADeliveryAgent'}>{t('beADeliveryAgent')}</NavLink>

    {/* Delivery agent routes */}
    {/* <NavLink className={({ isActive }) => isActive ? "mx-1 bg-[#D3123E] text-white rounded-full px-2 py-0.5 font-medium" : "mx-1 px-2 py-0.5 font-medium"} to={'/assignedParcels'}>Assigned Parcels</NavLink>
    <NavLink className={({ isActive }) => isActive ? "mx-1 bg-[#D3123E] text-white rounded-full px-2 py-0.5 font-medium" : "mx-1 px-2 py-0.5 font-medium"} to={'/updateStatus'}>Update Status</NavLink>
    <NavLink className={({ isActive }) => isActive ? "mx-1 bg-[#D3123E] text-white rounded-full px-2 py-0.5 font-medium" : "mx-1 px-2 py-0.5 font-medium"} to={'/deliveryRoute'}>Delivery Route</NavLink> */}
  </>

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 py-2 lg:px-8 lg:py-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="mr-2 lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <div className='flex items-center gap-2'>
          <img className='w-4 h-6 lg:w-6 lg:h-8' src={logo} alt="logo" />
          <Link className="font-semibold text-lg lg:text-2xl">Go<span className='text-[#CE133D]'><i>Quick</i></span></Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end space-x-3 lg:space-x-6">
        <div className="flex gap-1 items-center">
          {
            language ? (
              <button
                onClick={() => {
                  i18n.changeLanguage('en');
                  setLanguage(!language);
                }}
                className="flex items-center gap-1 hover:text-[#D3123E] transition bg-gray-100 p-2 rounded-full cursor-pointer"
              >
                <MdLanguage className='text-base lg:text-xl' />
              </button>
            ) : (
              <button
                onClick={() => {
                  i18n.changeLanguage('bn');
                  setLanguage(!language);
                }}
                className="flex items-center gap-1 hover:text-[#D3123E] transition bg-gray-100 p-2 rounded-full cursor-pointer"
              >
                <MdLanguage className='text-base lg:text-xl' />
              </button>
            )
          }

          {
            language ? <p className='font-medium'>En</p> : <p className='font-medium'>Bn</p>
          }

        </div>
        <Link to={'/login'} className="w-[60px] lg:w-[100px] flex justify-center items-center text-sm lg:text-base py-1 px-3 lg:py-1.5 lg:px-6 border-2 border-[#D3123E] text-[#D3123E] font-semibold rounded-md hover:bg-[#D3123E] hover:text-white cursor-pointer">{t('login')}</Link>
      </div>
    </div >
  );
};

export default Navbar;