import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaShippingFast, FaMapMarkerAlt, FaBriefcase, FaShieldAlt } from 'react-icons/fa';

const WhyChooseGoQuick = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FaShippingFast className="text-4xl mb-4 text-[#D3123E]" />,
      title: t('feature_fast_delivery_title', 'Super-Fast Delivery'),
      desc: t('feature_fast_delivery_desc', 'We ensure your parcels arrive on time — every time.'),
    },
    {
      icon: <FaMapMarkerAlt className="text-4xl mb-4 text-[#D3123E]" />,
      title: t('feature_tracking_title', 'Real-Time Tracking'),
      desc: t('feature_tracking_desc', 'Stay updated with live parcel tracking right from pickup to doorstep.'),
    },
    {
      icon: <FaBriefcase className="text-4xl mb-4 text-[#D3123E]" />,
      title: t('feature_corporate_title', 'Corporate Solutions'),
      desc: t('feature_corporate_desc', 'Reliable logistics tailored for your business needs.'),
    },
    {
      icon: <FaShieldAlt className="text-4xl mb-4 text-[#D3123E]" />,
      title: t('feature_security_title', 'Safe & Secure'),
      desc: t('feature_security_desc', 'Your package is our priority. Safe handling, every step of the way.'),
    },
  ];

  return (
    <section data-aos="fade-right" className="w-11/12 mx-auto my-10 md:my-24 text-center">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-3 relative inline-block">
        {t('why_choose_title', 'Why Choose GoQuick')}
      </h1>

      <p className="text-gray-600 text-lg mb-14 max-w-xl mx-auto">
        {t('why_choose_subtitle', 'Discover how GoQuick stands out in speed, security, and service across the nation.')}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map(({ icon, title, desc }, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
          >
            <div className="mb-4 p-4 rounded-full bg-gray-100">
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseGoQuick;
