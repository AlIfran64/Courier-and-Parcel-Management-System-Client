import React from 'react';
import { useForm } from 'react-hook-form';
import authBg from '../../../src/assets/images/authBg.jpg';
import { Link, useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../src/Hooks/useAuth'
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';

const Register = () => {

  const { t } = useTranslation();
  const { signup, updateUserProfile } = useAuth();
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || '/';

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {

    // Destructure
    const { email, password, fullName } = data;

    // Register
    signup(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Update user profile in firebase
        const userProfile = {
          displayName: fullName,
        }
        updateUserProfile(userProfile)
          .then(async () => {

            // Update user info in db
            const userInfo = {
              name: fullName,
              email: email,
              role: 'customer',
              createdAt: new Date().toISOString()
            }

            const userRes = await axiosInstance.post('/users', userInfo);

          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: `${error}`,
              icon: 'error',
              confirmButtonColor: '#D3123E',
            });
          })

        Swal.fire({
          title: 'Success!',
          text: 'You have registered successfully.',
          icon: 'success',
          confirmButtonColor: '#D3123E',
        });
        navigate(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        Swal.fire({
          title: 'Error!',
          text: `${errorMessage}`,
          icon: 'error',
          confirmButtonColor: '#D3123E',
        });
      });

  };

  return (
    <div
      className="py-10 px-4 flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${authBg})` }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 bg-opacity-60 z-0"></div>

      <div className="z-10 bg-white bg-opacity-90 p-8 rounded-lg max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-2">{t('title2')}</h2>
        <p className="text-sm text-gray-600 text-center mb-6">{t('subtitle2')}</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('fullName')}</label>
            <input
              type="text"
              {...register('fullName', { required: true })}
              placeholder={t('name')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D3123E]"
            />
            {errors.fullName?.type === 'required' && (
              <p className="text-red-500 text-sm mt-1">{t('fullName')}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
            <input
              type="email"
              {...register('email', {
                required: true,
                pattern: { value: /^\S+@\S+$/i, message: t('invalidEmail') }
              })}
              placeholder="example@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D3123E]"
            />
            {errors.email?.type === 'required' && (
              <p className="text-red-500 text-sm mt-1">{t('emailRequired')}</p>
            )}
            {errors.email?.type === 'pattern' && (
              <p className="text-red-500 text-sm mt-1">{t('invalidEmail')}</p>
            )}
          </div>

          {/* Password */}
          {/* Password */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('password')}</label>
            <input
              type="password"
              {...register('password', {
                required: true,
                minLength: { value: 6, message: t('passwordMinLength') },
                validate: {
                  hasUpperCase: (v) => /[A-Z]/.test(v) || t('passwordUppercase'),
                  hasLowerCase: (v) => /[a-z]/.test(v) || t('passwordLowercase'),
                },
              })}
              placeholder={t('password')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D3123E]"
            />

            {errors.password?.type === 'required' && (
              <p className="text-red-500 text-sm mt-1">{t('passwordRequired')}</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="text-red-500 text-sm mt-1">{t('passwordMinLength')}</p>
            )}
            {errors.password?.type === 'hasUpperCase' && (
              <p className="text-red-500 text-sm mt-1">{t('passwordUppercase')}</p>
            )}
            {errors.password?.type === 'hasLowerCase' && (
              <p className="text-red-500 text-sm mt-1">{t('passwordLowercase')}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#D3123E] hover:bg-[#b80e34] text-white font-semibold py-2 rounded transition duration-200 cursor-pointer"
          >
            {t('registerBtn')}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-sm text-center text-gray-600 mt-6">
          {t('alreadyAccount')}
          <Link to="/login" className="text-[#D3123E] font-medium hover:underline ml-1">
            {t('login2')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
