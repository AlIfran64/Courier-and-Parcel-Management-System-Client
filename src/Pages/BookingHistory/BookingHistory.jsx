import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const BookingHistory = () => {
  const { t } = useTranslation();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['booking-history', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Socket.io for real-time status updates
  useEffect(() => {
    socket.on('status-updated', () => {
      queryClient.invalidateQueries(['booking-history', user?.email]);
    });

    return () => socket.off('status-updated');
  }, [queryClient, user?.email]);

  return (
    <div className="w-11/12 mx-auto my-10 md:my-20 p-6 bg-white shadow-2xl rounded-xl">
      <h1 className="text-3xl font-bold mb-2">
        {t('Booking History')}
      </h1>
      <p className="text-gray-600 mb-6">
        {t('Track your parcel bookings and delivery statuses in real time')}
      </p>

      {isLoading ? (
        <p>{t('Loading...')}</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">{t('No bookings found.')}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#D3123E] text-white">
                <th className="px-4 py-2">{t('Pickup')}</th>
                <th className="px-4 py-2">{t('Delivery')}</th>
                <th className="px-4 py-2">{t('Size')}</th>
                <th className="px-4 py-2">{t('Payment')}</th>
                <th className="px-4 py-2">{t('Status')}</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, i) => (
                <tr
                  key={i}
                  className="text-center border-t border-gray-300 hover:bg-gray-100"
                >
                  <td className="px-4 py-2">{booking.pickupAddress}</td>
                  <td className="px-4 py-2">{booking.deliveryAddress}</td>
                  <td className="px-4 py-2 capitalize">{booking.parcelSize}</td>
                  <td className="px-4 py-2 uppercase">{booking.paymentType}</td>
                  <td className="px-4 py-2 font-medium text-[#D3123E]">
                    {booking.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
