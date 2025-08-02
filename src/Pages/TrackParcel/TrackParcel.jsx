import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';

// Fix leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom icons
const pickupIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: markerShadow,
  shadowSize: [41, 41],
});

const deliveryIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: markerShadow,
  shadowSize: [41, 41],
});

// Fit bounds component
const FitBounds = ({ parcels }) => {
  const map = useMap();

  useEffect(() => {
    const bounds = [];
    parcels.forEach(parcel => {
      if (parcel.pickup) bounds.push([parcel.pickup.lat, parcel.pickup.lng]);
      if (parcel.delivery) bounds.push([parcel.delivery.lat, parcel.delivery.lng]);
    });

    if (bounds.length) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [parcels, map]);

  return null;
};

const TrackParcel = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const defaultCenter = [23.8103, 90.4125]; // Dhaka

  const { data: parcels = [], isLoading, error } = useQuery({
    queryKey: ['parcels', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    }
  });

  if (isLoading) return <Loading />;
  if (error) return <p className="text-center text-red-600">Error fetching parcels</p>;

  return (
    <div className="w-11/12 mx-auto my-10 md:my-24 p-6 bg-white rounded-2xl shadow-2xl">
      <h1 className="text-3xl font-bold mb-2">{t('Track_Your_Parcel')}</h1>
      <p className="text-gray-600 mb-6">
        {t('Track_Parcel_Tile')}
      </p>

      <MapContainer center={defaultCenter} zoom={11} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds parcels={parcels} />

        {parcels.map((parcel, idx) => (
          <React.Fragment key={parcel._id || idx}>
            {parcel.pickup && (
              <Marker position={[parcel.pickup.lat, parcel.pickup.lng]} icon={pickupIcon}>
                <Popup>
                  <strong>{parcel.name}</strong><br />
                  <strong>Pickup:</strong> {parcel.pickupAddress}<br />
                  Status: {parcel.status}
                </Popup>
              </Marker>
            )}
            {parcel.delivery && (
              <Marker position={[parcel.delivery.lat, parcel.delivery.lng]} icon={deliveryIcon}>
                <Popup>
                  <strong>{parcel.name}</strong><br />
                  <strong>Delivery:</strong> {parcel.deliveryAddress}<br />
                  Status: {parcel.status}
                </Popup>
              </Marker>
            )}
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

export default TrackParcel;
