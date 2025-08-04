import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getIdToken } from 'firebase/auth';
import useAuth from '../Hooks/useAuth';

// Create Axios instance
const axiosSecure = axios.create({
  baseURL: 'https://goquick-server.vercel.app',
});

const useAxiosSecure = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Don't set up interceptors if no user yet
    if (!user) return;

    // Request interceptor to attach token
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        try {
          const token = await getIdToken(user); // Get fresh token
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Failed to fetch ID token", error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to catch 401/403 and logout
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          await logout();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors when component unmounts or user changes
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logout, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;