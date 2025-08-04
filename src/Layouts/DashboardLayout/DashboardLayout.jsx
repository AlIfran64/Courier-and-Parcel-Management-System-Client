import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, Outlet } from 'react-router';
import { FaTachometerAlt, FaUserCheck, FaUsersCog, FaChartBar, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../../src/assets/images/Transparent logo.png';

const DashboardLayout = () => {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const navLinks = (
    <nav className='flex flex-col gap-3 mt-8'>
      <NavLink
        to="/dashboard/dash"
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded-md transition duration-200 text-sm ${isActive ? 'bg-white text-[#D3123E]' : 'hover:bg-[#e22f54]'}`
        }
        onClick={() => setDrawerOpen(false)}
      >
        <FaTachometerAlt /> {t('dashboard')}
      </NavLink>

      <NavLink
        to="/dashboard/agentRequests"
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded-md transition duration-200 text-sm ${isActive ? 'bg-white text-[#D3123E]' : 'hover:bg-[#e22f54]'}`
        }
        onClick={() => setDrawerOpen(false)}
      >
        <FaUserCheck /> {t('delivery_agent_requests')}
      </NavLink>

      <NavLink
        to="/dashboard/assignAgents"
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded-md transition duration-200 text-sm ${isActive ? 'bg-white text-[#D3123E]' : 'hover:bg-[#e22f54]'}`
        }
        onClick={() => setDrawerOpen(false)}
      >
        <FaUsersCog /> {t('assign_agents')}
      </NavLink>

      <NavLink
        to="/dashboard/reports"
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded-md transition duration-200 text-sm ${isActive ? 'bg-white text-[#D3123E]' : 'hover:bg-[#e22f54]'}`
        }
        onClick={() => setDrawerOpen(false)}
      >
        <FaChartBar /> {t('reports')}
      </NavLink>
    </nav>
  );

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>

      {/* Mobile Drawer Header */}
      <div className='md:hidden flex items-center justify-between bg-[#D3123E] text-white p-4'>
        <Link to='/' className='flex items-center gap-2' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img className='w-5 h-7 invert brightness-0' src={logo} alt="logo" />
          <span className='font-semibold text-xl'>Go<i>Quick</i></span>
        </Link>
        <button onClick={toggleDrawer}>
          {drawerOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Sidebar for Desktop */}
      <div className='hidden md:flex flex-col bg-[#D3123E] text-white w-64 p-5'>
        <Link to='/' className='flex items-center justify-center gap-1 mt-2' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img className='w-4 h-6 lg:w-6 lg:h-8 invert brightness-0' src={logo} alt="logo" />
          <div className="font-semibold text-lg lg:text-2xl">Go<i>Quick</i></div>
        </Link>
        {navLinks}
      </div>

      {/* Drawer Sidebar for Mobile */}
      {drawerOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden' onClick={toggleDrawer}>
          <div
            className='absolute top-0 left-0 bg-[#D3123E] text-white w-64 p-5 h-full shadow-lg'
            onClick={(e) => e.stopPropagation()} // Prevents drawer from closing when clicking inside
          >
            <Link to='/' className='flex items-center gap-1' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img className='w-5 h-7 invert brightness-0' src={logo} alt="logo" />
              <div className="font-semibold text-lg">Go<i>Quick</i></div>
            </Link>
            {navLinks}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className='flex-1 p-4 md:p-8 bg-gray-50 min-h-screen'>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
