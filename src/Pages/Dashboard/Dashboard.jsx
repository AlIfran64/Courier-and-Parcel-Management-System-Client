import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

import {
  FaUsers,
  FaTruck,
  FaUserCheck,
  FaUserShield,
  FaBoxOpen,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaCreditCard
} from 'react-icons/fa';

import Loading from '../../Components/Loading/Loading';

const Dashboard = () => {
  const { t } = useTranslation();
  const axiosSecure = useAxiosSecure();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [usersRes, parcelsRes] = await Promise.all([
          axiosSecure.get('/users'),
          axiosSecure.get('/parcels'),
        ]);

        const users = usersRes.data;
        const parcels = parcelsRes.data;

        const dataSummary = {
          totalCustomers: users.filter(u => u.role === 'customer').length,
          totalDeliveryAgents: users.filter(u => u.role === 'deliveryAgent').length,
          totalAvailableAgents: users.filter(u => u.role === 'deliveryAgent' && u.availability === 'available').length,
          totalAdmins: users.filter(u => u.role === 'admin').length,
          totalParcels: parcels.length,
          totalDeliveredParcels: parcels.filter(p => p.status === 'Delivered').length,
          totalCOD: parcels.filter(p => p.paymentType === 'Cash on Delivery').length,
          totalPrepaid: parcels.filter(p => p.paymentType === 'Prepaid').length,
        };

        setSummary(dataSummary);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [axiosSecure]);

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{t('dashboard_title') || 'Dashboard'}</h1>
      <p className="text-gray-600 mb-6">{t('dashboard_subtitle')}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {/* Card: Total Customers */}
        <div className="bg-white shadow-lg rounded-lg p-5 flex items-center space-x-4 hover:shadow-xl transition-shadow cursor-pointer">
          <FaUsers className="text-5xl text-[#D3123E]" />
          <div>
            <p className="text-gray-500">{t('total_customers') || 'Total Customers'}</p>
            <p className="text-2xl font-semibold">{summary.totalCustomers}</p>
          </div>
        </div>

        {/* Card: Total Delivery Agents */}
        <div className="bg-white shadow-lg rounded-lg p-5 flex items-center space-x-4 hover:shadow-xl transition-shadow cursor-pointer">
          <FaTruck className="text-5xl text-[#D3123E]" />
          <div>
            <p className="text-gray-500">{t('total_delivery_agents') || 'Total Delivery Agents'}</p>
            <p className="text-2xl font-semibold">{summary.totalDeliveryAgents}</p>
          </div>
        </div>

        {/* Card: Available Delivery Agents */}
        <div className="bg-white shadow-lg rounded-lg p-5 flex items-center space-x-4 hover:shadow-xl transition-shadow cursor-pointer">
          <FaUserCheck className="text-5xl text-[#D3123E]" />
          <div>
            <p className="text-gray-500">{t('available_delivery_agents') || 'Available Delivery Agents'}</p>
            <p className="text-2xl font-semibold">{summary.totalAvailableAgents}</p>
          </div>
        </div>

        {/* Card: Total Admins */}
        <div className="bg-white shadow-lg rounded-lg p-5 flex items-center space-x-4 hover:shadow-xl transition-shadow cursor-pointer">
          <FaUserShield className="text-5xl text-[#D3123E]" />
          <div>
            <p className="text-gray-500">{t('total_admins') || 'Total Admins'}</p>
            <p className="text-2xl font-semibold">{summary.totalAdmins}</p>
          </div>
        </div>

        {/* Card: Total Parcels */}
        <div className="bg-white shadow-lg rounded-lg p-5 flex items-center space-x-4 hover:shadow-xl transition-shadow cursor-pointer">
          <FaBoxOpen className="text-5xl text-[#D3123E]" />
          <div>
            <p className="text-gray-500">{t('total_parcels') || 'Total Parcels'}</p>
            <p className="text-2xl font-semibold">{summary.totalParcels}</p>
          </div>
        </div>

        {/* Card: Parcels Delivered */}
        <div className="bg-white shadow-lg rounded-lg p-5 flex items-center space-x-4 hover:shadow-xl transition-shadow cursor-pointer">
          <FaClipboardCheck className="text-5xl text-[#D3123E]" />
          <div>
            <p className="text-gray-500">{t('parcels_delivered') || 'Parcels Delivered'}</p>
            <p className="text-2xl font-semibold">{summary.totalDeliveredParcels}</p>
          </div>
        </div>

        {/* Card: Total COD */}
        <div className="bg-white shadow-lg rounded-lg p-5 flex items-center space-x-4 hover:shadow-xl transition-shadow cursor-pointer">
          <FaMoneyBillWave className="text-5xl text-[#D3123E]" />
          <div>
            <p className="text-gray-500">{t('total_cod') || 'Total COD'}</p>
            <p className="text-2xl font-semibold">{summary.totalCOD}</p>
          </div>
        </div>

        {/* Card: Total Prepaid */}
        <div className="bg-white shadow-lg rounded-lg p-5 flex items-center space-x-4 hover:shadow-xl transition-shadow cursor-pointer">
          <FaCreditCard className="text-5xl text-[#D3123E]" />
          <div>
            <p className="text-gray-500">{t('total_prepaid') || 'Total Prepaid'}</p>
            <p className="text-2xl font-semibold">{summary.totalPrepaid}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
