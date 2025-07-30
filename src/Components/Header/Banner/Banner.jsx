import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router';
import slider1 from '../../../../src/assets/images/slider1.jpg';
import slider2 from '../../../../src/assets/images/slider2.jpg';
import slider3 from '../../../../src/assets/images/slider3.png';



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import { useTranslation } from 'react-i18next';

const Banner = () => {

  const { t } = useTranslation();

  return (
    <Swiper
      pagination={{ dynamicBullets: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper w-full h-[280px] lg:h-[600px]"
    >

      {/* Slider-1 */}
      <SwiperSlide>
        <div className="relative w-full h-full">
          <img
            src={slider1}
            alt="slider-1 image"
            className="w-full h-full object-cover"
          />

          {/* Left-to-right black gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent flex flex-col justify-center items-start text-white px-4 sm:px-8 md:px-12 lg:px-20">
            <div className='max-w-2xl'>
              <h2 className="text-base sm:text-xl md:text-2xl lg:text-5xl font-bold mb-2 md:mb-4 text-start">
                {t('sliderHeading1')}
              </h2>
              <p className="mb-2 md:mb-10 text-xs sm:text-sm lg:text-lg text-start text-white/90">
                {t('sliderSubHeading1')}
              </p>
            </div>

            <Link to={'/availableFoods'}>
              <button className="bg-[#D3123E] text-white font-medium rounded hover:bg-[#404042]  px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm lg:text-lg">
                {t('sliderButton1')}
              </button>
            </Link>
          </div>
        </div>
      </SwiperSlide>

      {/* Slider-2 */}
      <SwiperSlide>
        <div className="relative w-full h-full">
          <img
            src={slider2}
            alt="slider-2 image"
            className="w-full h-full object-cover"
          />

          {/* Left-to-right black gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent flex flex-col justify-center items-start text-white px-4 sm:px-8 md:px-12 lg:px-20">

            <div className='max-w-2xl'>
              <h2 className="text-base sm:text-xl md:text-2xl lg:text-5xl font-bold mb-2 md:mb-4 text-start">
                {t('sliderHeading2')}
              </h2>
              <p className="mb-2 md:mb-10 text-xs sm:text-sm lg:text-lg text-start text-white/90">
                {t('sliderSubHeading2')}
              </p>
            </div>

            <Link to={'/addFood'}>
              <button className="bg-[#D3123E] text-white font-medium rounded hover:bg-[#404042] px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm lg:text-lg">
                {t('sliderButton2')}
              </button>
            </Link>
          </div>
        </div>
      </SwiperSlide>

      {/* Slider-3 */}
      <SwiperSlide>
        <div className="relative w-full h-full">
          <img
            src={slider3}
            alt="slider-3 image"
            className="w-full h-full object-cover"
          />

          {/* Left-to-right black gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent flex flex-col justify-center items-start text-white px-4 sm:px-8 md:px-12 lg:px-20">

            <div className='max-w-2xl'>
              <h2 className="text-base sm:text-xl md:text-2xl lg:text-5xl font-bold mb-2 md:mb-4 text-start">
                {t('sliderHeading3')}
              </h2>
              <p className="mb-2 md:mb-10 text-xs sm:text-sm lg:text-lg text-start text-white/90">
                {t('sliderSubHeading3')}
              </p>
            </div>

            <Link to={'/myFoodRequest'}>
              <button className="bg-[#D3123E] text-white font-medium rounded hover:bg-[#404042] px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm lg:text-lg">
                {t('beADeliveryAgent')}
              </button>
            </Link>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;