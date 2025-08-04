import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import BookParcel from "../Pages/BookParcel/BookParcel";
import BookingHistory from "../Pages/BookingHistory/BookingHistory";
import TrackParcel from "../Pages/TrackParcel/TrackParcel";
import BeADeliveryAgent from "../Pages/BeADeliveryAgent/BeADeliveryAgent";
import AssignedParcels from "../Pages/AssignedParcels/AssignedParcels";
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
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoutes from "./AdminRoutes";
import DeliveryAgentRoute from "./DeliveryAgentRoute";
import CustomerRoutes from "./CustomerRoutes";

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
          <CustomerRoutes>
            <PrivateRoutes>
              <BookParcel></BookParcel>
            </PrivateRoutes>
          </CustomerRoutes>
      },
      {
        path: 'bookingHistory',
        element:
          <CustomerRoutes>
            <PrivateRoutes>
              <BookingHistory></BookingHistory>
            </PrivateRoutes>
          </CustomerRoutes>
      },
      {
        path: 'trackParcel',
        element:
          <CustomerRoutes>
            <PrivateRoutes>
              <TrackParcel></TrackParcel>
            </PrivateRoutes>
          </CustomerRoutes>
      },
      {
        path: 'beADeliveryAgent',
        element:
          <CustomerRoutes>
            <PrivateRoutes>
              <BeADeliveryAgent></BeADeliveryAgent>
            </PrivateRoutes>
          </CustomerRoutes>
      },
      {
        path: 'assignedParcels',
        element:
          <DeliveryAgentRoute>
            <PrivateRoutes>
              <AssignedParcels></AssignedParcels>
            </PrivateRoutes>
          </DeliveryAgentRoute>
      },
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
    element:
      <AdminRoutes>
        <PrivateRoutes>
          <DashboardLayout></DashboardLayout>
        </PrivateRoutes>
      </AdminRoutes>,
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
  },

  // Error Pages
  {
    path: '/forbidden',
    element: <Forbidden></Forbidden>
  },
  {
    path: '*',
    element: <ErrorPage></ErrorPage>
  }

]);