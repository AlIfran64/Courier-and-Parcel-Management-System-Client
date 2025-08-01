import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import authBg from '../../../src/assets/images/authBg.jpg';
import { useTranslation } from 'react-i18next';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import Swal from 'sweetalert2';

const Login = () => {

  const { t } = useTranslation();
  const { login, googleLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || '/';
  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {

    // Destructure
    const { email, password } = data;

    // Login
    login(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        Swal.fire({
          title: 'Success!',
          text: 'You have logged in successfully.',
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

  const handleGoogleLogin = () => {

    googleLogin()
      .then(async (result) => {
        const user = result.user;

        // Update user info in db
        const userGoogleInfo = {
          name: user.displayName,
          email: user.email,
          role: 'customer',
          createdAt: new Date().toISOString()
        }

        const userRes = await axiosInstance.post('/users', userGoogleInfo);

        Swal.fire({
          title: 'Success!',
          text: 'You have logged in successfully.',
          icon: 'success',
          confirmButtonColor: '#D3123E',
        });
        navigate(from);
      }).catch((error) => {
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
      className="relative py-10 flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${authBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 bg-opacity-60 z-0" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">{t('title')}</h2>
        <p className="text-sm text-gray-600 text-center mb-6">{t('subtitle')}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">{t('email')}</label>
            <input
              type="email"
              {...register('email', { required: true })}
              placeholder="example@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D3123E]"
            />
            {errors.email?.type === 'required' && (
              <p className="text-red-500 text-sm mt-1">{t('emailRequired')}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">{t('password')}</label>
            <input
              type="password"
              {...register('password', { required: true })}
              placeholder={t('password')}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D3123E]"
            />
            {errors.password?.type === 'required' && (
              <p className="text-red-500 text-sm mt-1">{t('passwordRequired')}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#D3123E] text-white py-2 rounded-md font-semibold hover:bg-[#b81034] transition cursor-pointer"
          >
            {t('loginBtn')}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-3">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-400 text-sm">{t('or')}</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
        >
          <FcGoogle size={20} />
          <span className="text-sm text-gray-700 font-medium">{t('googleLogin')}</span>
        </button>

        {/* Register Link */}
        <p className="text-sm text-center text-gray-600 mt-6">
          {t('noAccount')}
          <Link to="/register" className="text-[#D3123E] font-medium hover:underline ml-1">
            {t('register')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
