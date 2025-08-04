import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import socket from '../../utils/socket';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const AssignedParcels = () => {
  const { t } = useTranslation();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [updatedParcelId, setUpdatedParcelId] = useState(null);

  // Fetch parcels
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['assignedParcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/assigned?email=${user?.email}`);
      console.log("User email:", user?.email);
      console.log("Assigned parcels:", res.data);
      return res.data;
    },
    enabled: !!user?.email,
  });


  // Real-time refetch on status update
  useEffect(() => {
    socket.on('status-updated', () => {
      refetch();
    });
    return () => socket.off('status-updated');
  }, [refetch]);

  const handleStatusChange = async (parcelId, newStatus) => {
    try {
      await axiosSecure.patch(`/parcels/${parcelId}`, {
        status: newStatus,
      });
      setUpdatedParcelId(parcelId);

      if (newStatus === 'Delivered' || newStatus === 'Failed') {
        // Email will be sent from backend
      }

      socket.emit('status-updated');
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  return (
    <div className="w-11/12 mx-auto my-10 md:my-24">
      <h1 className="text-2xl font-bold mb-1">Assigned Parcels</h1>
      <p className="text-gray-600 mb-4">All parcels assigned to you</p>

      {parcels.length === 0 ? (
        <p>No assigned parcels to display.</p>
      ) : (
        <div className="space-y-6">
          {parcels.map((parcel) => (
            <div className="flex flex-col md:flex-row gap-6 shadow-lg p-4 border border-[#D3123E] rounded-xl">
              {/* Left: Parcel Info */}
              <div className="md:w-1/2 p-6">
                <h2 className="text-xl font-semibold mb-5">
                  Parcel from {parcel.pickupAddress} to {parcel.deliveryAddress}
                </h2>

                <p><strong>Size:</strong> {parcel.parcelSize}</p>
                <p><strong>Payment:</strong> {parcel.paymentType}</p>
                <p><strong>Receiver Email:</strong> {parcel.email}</p>
                <p><strong>Status:</strong> {parcel.status}</p>

                <div className="mt-8">
                  <label className="block font-bold text-gray-700 mb-1">
                    Update Status
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={parcel.status}
                    onChange={(e) => handleStatusChange(parcel._id, e.target.value)}
                  >
                    <option value="Assigned">Assigned</option>
                    <option value="Picked Up">Picked Up</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
              </div>

              {/* Right: Map */}
              <div className="md:w-1/2">
                <MapContainer
                  center={[parcel.pickup.lat, parcel.pickup.lng]}
                  zoom={12}
                  style={{ height: '300px', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <Marker position={[parcel.pickup.lat, parcel.pickup.lng]}>
                    <Popup>Pickup: {parcel.pickupAddress}</Popup>
                  </Marker>
                  <Marker position={[parcel.delivery.lat, parcel.delivery.lng]}>
                    <Popup>Delivery: {parcel.deliveryAddress}</Popup>
                  </Marker>
                  <Polyline
                    positions={[
                      [parcel.pickup.lat, parcel.pickup.lng],
                      [parcel.delivery.lat, parcel.delivery.lng],
                    ]}
                    color="blue"
                  />
                </MapContainer>
              </div>
            </div>

          ))}
        </div>
      )}
    </div>
  );
};

export default AssignedParcels;
