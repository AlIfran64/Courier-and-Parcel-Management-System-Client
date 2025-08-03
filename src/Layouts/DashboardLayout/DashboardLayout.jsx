import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, Outlet } from 'react-router';
import { FaTachometerAlt, FaUserCheck, FaUsersCog, FaChartBar } from 'react-icons/fa';
import logo from '../../../src/assets/images/Transparent logo.png';

const DashboardLayout = () => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Sidebar */}
      <div className='bg-[#D3123E] text-white w-full md:w-64 p-5 space-y-4'>

        {/* logo */}
        <Link to='/' className='flex items-center justify-center gap-1 mt-2' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img className='w-4 h-6 lg:w-6 lg:h-8 invert brightness-0' src={logo} alt="logo" />
          <div className="font-semibold text-lg lg:text-2xl">Go<i>Quick</i></div>
        </Link>

        <nav className='flex flex-col gap-3 mt-8'>
          <NavLink
            to="/dashboard/dash"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md transition duration-200 text-sm ${isActive ? 'bg-white text-[#D3123E]' : 'hover:bg-[#e22f54]'}`
            }
          >
            <FaTachometerAlt /> {t('dashboard')}
          </NavLink>

          <NavLink
            to="/dashboard/agentRequests"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md transition duration-200 text-sm ${isActive ? 'bg-white text-[#D3123E]' : 'hover:bg-[#e22f54]'}`
            }
          >
            <FaUserCheck /> {t('delivery_agent_requests')}
          </NavLink>

          <NavLink
            to="/dashboard/assignAgents"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md transition duration-200 text-sm ${isActive ? 'bg-white text-[#D3123E]' : 'hover:bg-[#e22f54]'}`
            }
          >
            <FaUsersCog /> {t('assign_agents')}
          </NavLink>

          <NavLink
            to="/dashboard/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md transition duration-200 text-sm ${isActive ? 'bg-white text-[#D3123E]' : 'hover:bg-[#e22f54]'}`
            }
          >
            <FaChartBar /> {t('reports')}
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className='flex-1 p-8'>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
