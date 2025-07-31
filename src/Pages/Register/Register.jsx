import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import authBg from '../../../src/assets/images/authBg.jpg';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div
      className="py-10 flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${authBg})` }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 bg-opacity-60 z-0"></div>

      <div className="z-10 bg-white bg-opacity-90 p-8 rounded-lg max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-sm text-gray-600 text-center mb-6">Register to manage your parcels effortlessly</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              {...register('fullName', { required: 'Full name is required' })}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#D3123E]"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
              })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#D3123E]"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'At least 6 characters' },
                validate: {
                  hasUpperCase: (v) => /[A-Z]/.test(v) || 'Must include an uppercase letter',
                  hasLowerCase: (v) => /[a-z]/.test(v) || 'Must include a lowercase letter'
                }
              })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#D3123E]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-10 right-3 text-gray-500 hover:text-[#D3123E]"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>

            {/* Errors */}
            {errors.password?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#D3123E] hover:bg-[#b80e34] text-white font-semibold py-2 rounded transition duration-200"
          >
            Register
          </button>
        </form>

        {/* Register Link */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#D3123E] font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
