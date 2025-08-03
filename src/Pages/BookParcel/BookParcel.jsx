import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';

const BookParcel = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post('/parcels', data);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: t('Success!'),
        text: t('Your parcel has been booked.'),
        confirmButtonColor: '#D3123E',
        confirmButtonText: `${t('ok')}`
      });
      reset();
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: t('Oops...'),
        text: t('Something went wrong!'),
        confirmButtonColor: '#D3123E',
        confirmButtonText: `${t('ok')}`
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({ ...data, email: user.email, name: user.displayName });
  };

  return (
    <div className='w-11/12 mx-auto my-10 md:my-24 bg-white rounded-2xl shadow-2xl p-8'>
      <h1 className='text-3xl md:text-4xl font-bold mb-2'>{t('Book Parcel')}</h1>
      <p className='text-gray-600 mb-6'>{t('Fill out the form below to schedule your pickup and delivery in just a few clicks.')}</p>

      <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-2 gap-6'>

        {/* Your name */}
        <div>
          <label className='block mb-1 text-sm text-gray-700'>{t('Your Name')}</label>
          <input
            type='text'
            value={user?.displayName || ''}
            disabled
            className='w-full border rounded px-4 py-2 bg-gray-100 cursor-not-allowed text-gray-500'
          />
        </div>

        {/* Your email */}
        <div>
          <label className='block mb-1 text-sm text-gray-700'>{t('Your Email')}</label>
          <input
            type='email'
            value={user?.email || ''}
            disabled
            className='w-full border rounded px-4 py-2 bg-gray-100 cursor-not-allowed text-gray-500'
          />
        </div>

        {/* Pickup address */}
        <div>
          <label className='block mb-1 text-sm text-gray-700'>{t('Pickup Address')}</label>
          <input
            type='text'
            {...register('pickupAddress', { required: true })}
            className='w-full border rounded px-4 py-2 focus:outline-[#D3123E]'
          />
          {errors.pickupAddress && <span className='text-red-500 text-sm'>{t('Pickup Address is required')}</span>}
        </div>

        {/* Delivery address */}
        <div>
          <label className='block mb-1 text-sm text-gray-700'>{t('Delivery Address')}</label>
          <input
            type='text'
            {...register('deliveryAddress', { required: true })}
            className='w-full border rounded px-4 py-2 focus:outline-[#D3123E]'
          />
          {errors.deliveryAddress && <span className='text-red-500 text-sm'>{t('Delivery Address is required')}</span>}
        </div>

        {/* Parcel Size */}
        <div>
          <label className='block mb-1 text-sm text-gray-700'>{t('Parcel Size')}</label>
          <select
            {...register('parcelSize', { required: true })}
            className='w-full border rounded px-4 py-2 focus:outline-[#D3123E]'
          >
            <option value="">{t('Select size')}</option>
            <option value="Small">{t('Small (Up to 1kg)')}</option>
            <option value="Medium">{t('Medium (1-5kg)')}</option>
            <option value="Large">{t('Large (5-20kg)')}</option>
            <option value="Extra Large">{t('Extra Large (20kg+)')}</option>
          </select>
          {errors.parcelSize && <span className='text-red-500 text-sm'>{t('Parcel Size is required')}</span>}
        </div>

        {/* Payment type */}
        <div>
          <label className='block mb-1 text-sm text-gray-700'>{t('Payment Type')}</label>
          <select
            {...register('paymentType', { required: true })}
            className='w-full border rounded px-4 py-2 focus:outline-[#D3123E]'
          >
            <option value="">{t('Select payment type')}</option>
            <option value="Cash on delivery">{t('Cash on Delivery')}</option>
            <option value="Prepaid">{t('Prepaid')}</option>
          </select>
          {errors.paymentType && <span className='text-red-500 text-sm'>{t('Payment type is required')}</span>}
        </div>



        <div className='md:col-span-2'>
          <button
            type='submit'
            className='w-full bg-[#D3123E] hover:bg-[#b20f35] transition-colors duration-300 text-white font-semibold py-3 rounded-lg cursor-pointer'
          >
            {t('Book Now')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookParcel;
