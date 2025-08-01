import React from 'react';
import services from '../../../src/assets/images/services.jpg';
import { useTranslation } from 'react-i18next';
import { FaShippingFast, FaMapMarkedAlt, FaBusinessTime, FaLock } from 'react-icons/fa';

const OurServices = () => {
  const { t } = useTranslation();

  return (
    <div
      data-aos="zoom-in"
      className="w-11/12 mx-auto my-10 md:my-24 relative bg-cover bg-center rounded-2xl overflow-hidden text-white"
      style={{
        backgroundImage: `url(${services})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/85 bg-opacity-70 z-0"></div>

      {/* Content */}
      <div className="relative z-10 px-6 py-15 w-11/12 mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          {t('our_services_title', 'Our Services')}
        </h2>
        <p className="text-lg mb-14 max-w-xl mx-auto">
          {t(
            'our_services_subtitle',
            'Delivering more than parcels — we deliver trust, speed, and satisfaction across the nation.'
          )}
        </p>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
          <div className="flex items-start space-x-4">
            <FaShippingFast className="text-6xl" style={{ color: '#D3123E' }} />
            <div>
              <h3 className="text-xl font-semibold">{t('fast_delivery', 'Super-Fast Delivery')}</h3>
              <p>{t('fast_delivery_desc', 'We ensure your parcels arrive on time — every time.')}</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <FaMapMarkedAlt className="text-5xl" style={{ color: '#D3123E' }} />
            <div>
              <h3 className="text-xl font-semibold">{t('real_time_tracking', 'Real-Time Tracking')}</h3>
              <p>{t('real_time_tracking_desc', 'Stay updated with live parcel tracking right from pickup to doorstep.')}</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <FaBusinessTime className="text-5xl" style={{ color: '#D3123E' }} />
            <div>
              <h3 className="text-xl font-semibold">{t('corporate_solutions', 'Corporate Solutions')}</h3>
              <p>{t('corporate_solutions_desc', 'Reliable logistics tailored for your business needs.')}</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <FaLock className="text-5xl" style={{ color: '#D3123E' }} />
            <div>
              <h3 className="text-xl font-semibold">{t('safe_secure', 'Safe & Secure')}</h3>
              <p>{t('safe_secure_desc', 'Your package is our priority. Safe handling, every step of the way.')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
