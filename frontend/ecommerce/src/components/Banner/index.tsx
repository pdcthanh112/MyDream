// 'use client'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import Banner1 from '@assets/images/banner1.jpg';
import Banner2 from '@assets/images/banner2.jpg';
import Banner3 from '@assets/images/banner3.jpg';

export default function Banner() {

const carousel = [Banner1, Banner2, Banner3]

  return (
    <div className="relative">
      <div className='absolute w-full bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20'/>
      <Carousel 
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        interval={5000}
      >
        {carousel.map((item) => (
          <div key={1}>
          <Image
            src={item}
            alt="Banner"
            loading="lazy"
            style={{ width: 1450, height: 450 }}
          />
        </div>
        ))}
      </Carousel>
    </div>
  );
}
