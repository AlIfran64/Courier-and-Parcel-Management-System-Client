import React from 'react';
import deliveringNation from '../../../src/assets/images/deliveringNation.png';
import { useTranslation } from 'react-i18next';

const DeliveringNationwide = () => {
  const { t } = useTranslation();

  return (
    <div data-aos="fade-up" className="w-11/12 mx-auto my-10 md:my-24">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-5">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 leading-tight text-gray-900">
            {t('delivering_title', 'Your Package, Delivered with Speed & Care')}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
            {t(
              'delivering_subtitle',
              'GoQuick is your trusted partner for quick, secure, and efficient courier and parcel services across the country. Whether you\'re sending a small gift or a business shipment — we handle it all with precision.'
            )}
          </p>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2">
          <img
            className="w-full object-cover"
            src={deliveringNation}
            alt={t('delivering_image_alt', 'Delivering Nationwide')}
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveringNationwide;
