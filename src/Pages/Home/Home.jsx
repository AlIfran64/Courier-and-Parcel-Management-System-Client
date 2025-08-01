import React from 'react';
import Banner from '../../Components/Header/Banner/Banner';
import DeliveringNationwide from '../../Components/DeliveringNationwide/DeliveringNationwide';
import WhyChooseGoQuick from '../../Components/WhyChooseGoQuick/WhyChooseGoQuick';
import OurServices from '../../Components/OurServices/OurServices';
import CustomerTestimonials from '../../Components/CustomerTestimonials/CustomerTestimoials';

const Home = () => {
  return (
    <div>
      <Banner></Banner>

      <DeliveringNationwide></DeliveringNationwide>

      <WhyChooseGoQuick></WhyChooseGoQuick>

      <OurServices></OurServices>

      <CustomerTestimonials></CustomerTestimonials>
    </div>
  );
};

export default Home;