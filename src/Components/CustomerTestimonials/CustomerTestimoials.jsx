import React, { useState } from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomerTestimonials = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
    infinite: true,
    speed: 500,
    afterChange: (current) => setActiveIndex(current),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
    arrows: false,
    dots: true,
    dotsClass: 'slick-dots custom-dots !bottom-[-30px]',
  };

  return (
    <section className="w-11/12 mx-auto my-10 md:my-24">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">
          {t('customer_testimonials_title', 'Customer Testimonials')}
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          {t(
            'customer_testimonials_subtitle',
            'Hear what our satisfied customers say about GoQuick’s exceptional logistics services.'
          )}
        </p>
      </div>

      <Slider {...settings}>

        {/* Card 1: John Doe */}
        <div className={`px-3 outline-none transition-all duration-300 p-5`}>
          <div
            className={`rounded-xl p-6 flex flex-col items-center text-center min-h-[330px] bg-white ${activeIndex === 0 ? 'border-t-4 border-[#D3123E]' : 'border-transparent'
              }`}
            style={{
              boxShadow: activeIndex === 0
                ? '0 8px 30px rgba(211, 18, 62, 0.3)'
                : '0 4px 18px rgba(0, 0, 0, 0.08)',
              transform: activeIndex === 0 ? 'scale(1)' : 'scale(0.96)',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <img
              src="https://randomuser.me/api/portraits/men/11.jpg"
              alt="John Doe"
              className="w-20 h-20 rounded-full object-cover border-2 border-[#D3123E] mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{t('john_name')}</h3>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">
              {t('john_review')}
            </p>
          </div>
        </div>

        {/* Card 2: Maria Rodriguez */}
        <div className={`px-3 outline-none transition-all duration-300 p-5`}>
          <div
            className={`rounded-xl p-6 flex flex-col items-center text-center min-h-[330px] bg-white ${activeIndex === 1 ? 'border-t-4 border-[#D3123E]' : 'border-transparent'
              }`}
            style={{
              boxShadow: activeIndex === 1
                ? '0 8px 30px rgba(211, 18, 62, 0.3)'
                : '0 4px 18px rgba(0, 0, 0, 0.08)',
              transform: activeIndex === 1 ? 'scale(1)' : 'scale(0.96)',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <img
              src="https://randomuser.me/api/portraits/women/21.jpg"
              alt="Maria Rodriguez"
              className="w-20 h-20 rounded-full object-cover border-2 border-[#D3123E] mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{t('maria_name')}</h3>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">
              {t('maria_review')}
            </p>
          </div>
        </div>

        {/* Card 3: Ahmed Khan */}
        <div className={`px-3 outline-none transition-all duration-300 p-5`}>
          <div
            className={`rounded-xl p-6 flex flex-col items-center text-center min-h-[330px] bg-white ${activeIndex === 2 ? 'border-t-4 border-[#D3123E]' : 'border-transparent'
              }`}
            style={{
              boxShadow: activeIndex === 2
                ? '0 8px 30px rgba(211, 18, 62, 0.3)'
                : '0 4px 18px rgba(0, 0, 0, 0.08)',
              transform: activeIndex === 2 ? 'scale(1)' : 'scale(0.96)',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <img
              src="https://randomuser.me/api/portraits/men/31.jpg"
              alt="Ahmed Khan"
              className="w-20 h-20 rounded-full object-cover border-2 border-[#D3123E] mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{t('ahmed_name')}</h3>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">
              {t('ahmed_review')}
            </p>
          </div>
        </div>

        {/* Card 4: Sophia Lee */}
        <div className={`px-3 outline-none transition-all duration-300 p-5`}>
          <div
            className={`rounded-xl p-6 flex flex-col items-center text-center min-h-[330px] bg-white ${activeIndex === 3 ? 'border-t-4 border-[#D3123E]' : 'border-transparent'
              }`}
            style={{
              boxShadow: activeIndex === 3
                ? '0 8px 30px rgba(211, 18, 62, 0.3)'
                : '0 4px 18px rgba(0, 0, 0, 0.08)',
              transform: activeIndex === 3 ? 'scale(1)' : 'scale(0.96)',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <img
              src="https://randomuser.me/api/portraits/women/41.jpg"
              alt="Sophia Lee"
              className="w-20 h-20 rounded-full object-cover border-2 border-[#D3123E] mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{t('sophia_name')}</h3>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">
              {t('sophia_review')}
            </p>
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default CustomerTestimonials;
