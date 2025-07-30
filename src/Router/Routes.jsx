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


export const router = createBrowserRouter([
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
        element: <BookParcel></BookParcel>
      },
      {
        path: 'bookingHistory',
        element: <BookingHistory></BookingHistory>
      },
      {
        path: 'trackParcel',
        element: <TrackParcel></TrackParcel>
      },
      {
        path: 'beADeliveryAgent',
        element: <BeADeliveryAgent></BeADeliveryAgent>
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
  }
]);