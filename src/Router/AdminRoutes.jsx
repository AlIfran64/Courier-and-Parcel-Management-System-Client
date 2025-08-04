import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import Loading from '../Components/Loading/Loading';

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (!user || role !== 'admin') {
    return (
      <Navigate
        to="/forbidden"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default AdminRoutes;