import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import BookParcel from "../Pages/BookParcel/BookParcel";
import BookingHistory from "../Pages/BookingHistory/BookingHistory";
import TrackParcel from "../Pages/TrackParcel/TrackParcel";
import BeADeliveryAgent from "../Pages/BeADeliveryAgent/BeADeliveryAgent";
import AssignedParcels from "../Pages/AssignedParcels/AssignedParcels";
import UpdateStatus from "../Pages/UpdateStatus/updateStatus";
import DeliveryRoute from "../Pages/DeliveryRoute/DeliveryRoute";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoutes from '../../src/Router/PrivateRoutes';
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DeliveryAgentReq from '../Pages/DeliveryAgentReq/DeliveryAgentReq';
import AssignAgentsToParcels from "../Pages/AssignAgentsToParcels/AssignAgentsToParcels";
import Reports from "../Pages/Reports/Reports";
import DashboardRedirect from "../Pages/DashboardRedirect/DashboardRedirect";

export const router = createBrowserRouter([

  // Main Layout
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: 'bookParcel',
        element:
          <PrivateRoutes>
            <BookParcel></BookParcel>
          </PrivateRoutes>
      },
      {
        path: 'bookingHistory',
        element:
          <PrivateRoutes>
            <BookingHistory></BookingHistory>
          </PrivateRoutes>
      },
      {
        path: 'trackParcel',
        element:
          <PrivateRoutes>
            <TrackParcel></TrackParcel>
          </PrivateRoutes>
      },
      {
        path: 'beADeliveryAgent',
        element:
          <PrivateRoutes>
            <BeADeliveryAgent></BeADeliveryAgent>
          </PrivateRoutes>
      },
      {
        path: 'assignedParcels',
        element: <AssignedParcels></AssignedParcels>
      },
      {
        path: 'updateStatus',
        element: <UpdateStatus></UpdateStatus>
      },
      {
        path: 'deliveryRoute',
        element: <DeliveryRoute></DeliveryRoute>
      }
    ]
  },

  // Auth Layout
  {
    path: '/',
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      }
    ]
  },

  // Dashboard Layout
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        element: <DashboardRedirect></DashboardRedirect>
      },
      {
        path: 'dash',
        element: <Dashboard></Dashboard>
      },
      {
        path: 'agentRequests',
        element: <DeliveryAgentReq></DeliveryAgentReq>
      },
      {
        path: 'assignAgents',
        element: <AssignAgentsToParcels></AssignAgentsToParcels>
      },
      {
        path: 'reports',
        element: <Reports></Reports>
      }
    ]
  }
]);