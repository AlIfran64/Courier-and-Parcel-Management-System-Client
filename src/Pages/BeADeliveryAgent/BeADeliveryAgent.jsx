import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';

const BeADeliveryAgent = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.post('/deliveryAgents', formData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: `${t('success')}`,
        text: `${t('You_have_successfully_applied_as_a_delivery_agent')}`,
        confirmButtonColor: '#D3123E',
        confirmButtonText: `${t('ok')}`
      });
      reset();
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: `${t('error')}`,
        text: `${t('error_message')}`,
        confirmButtonColor: '#D3123E',
        confirmButtonText: `${t('ok')}`
      });
    }
  });

  const onSubmit = async (data) => {
    const confirmed = await Swal.fire({
      title: `${t('Are_you_sure?')}`,
      text: `${t('You_are_applying_to_be_a_delivery_agent')}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#D3123E',
      confirmButtonText: `${t('apply')}`,
    });

    if (confirmed.isConfirmed) {
      mutation.mutate(data);
    }
  };

  return (
    <div className='w-11/12 mx-auto my-10 md:my-24 p-6 bg-white rounded-2xl shadow-lg'>
      <h1 className='text-3xl font-bold mb-4'>{t('Be a Delivery Agent')}</h1>
      <p className='text-gray-600 mb-6'>{t('Fill out the form to become a delivery agent.')}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name (read-only) */}
          <div>
            <label className='block font-medium mb-1'>{t('Name')}</label>
            <input
              type="text"
              value={user?.displayName || ''}
              readOnly
              {...register('name')}
              className='w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed'
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className='block font-medium mb-1'>{t('Email')}</label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              {...register('email')}
              className='w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed'
            />
          </div>

          {/* Phone */}
          <div>
            <label className='block font-medium mb-1'>{t('Phone')}</label>
            <input
              type="tel"
              {...register('phone', { required: true })}
              className='w-full px-4 py-2 border rounded-md'
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-600 text-sm">{t('phone_number')}</p>}
          </div>

          {/* NID */}
          <div>
            <label className='block font-medium mb-1'>{t('NID Number')}</label>
            <input
              type="text"
              {...register('nid', { required: true })}
              className='w-full px-4 py-2 border rounded-md'
              placeholder="Enter your NID number"
            />
            {errors.nid && <p className="text-red-600 text-sm">{t('nid_number')}</p>}
          </div>
        </div>

        {/* Address (full width) */}
        <div>
          <label className='block font-medium mb-1'>{t('Address')}</label>
          <textarea
            {...register('address', { required: true })}
            className='w-full p-3 border rounded-md'
            placeholder="Enter your address"
          ></textarea>
          {errors.address && <p className="text-red-600 text-sm">{t("address")}</p>}
        </div>

        {/* Submit button (full width) */}
        <button
          type="submit"
          className="w-full bg-[#D3123E] text-white px-6 py-3 font-semibold rounded-md hover:bg-[#b20f35] transition cursor-pointer"
        >
          {t('Submit Application')}
        </button>
      </form>
    </div>
  );
};

export default BeADeliveryAgent;
