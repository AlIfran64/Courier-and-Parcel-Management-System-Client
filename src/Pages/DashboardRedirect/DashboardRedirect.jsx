import React from 'react';
import { Navigate } from 'react-router';


const DashboardRedirect = () => {
  return <Navigate to="/dashboard/dash" replace />;

};

export default DashboardRedirect;