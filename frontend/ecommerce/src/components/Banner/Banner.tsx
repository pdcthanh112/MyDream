import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import Daisy1 from '@assets/images/daisy1.jpg';
import Daisy2 from '@assets/images/daisy2.jpg';
import Daisy3 from '@assets/images/daisy3.jpg';
import Daisy4 from '@assets/images/daisy4.jpg';
import Daisy5 from '@assets/images/daisy5.jpg';

export default function Banner() {
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
        <div>
          <Image
            src={Daisy1}
            alt="Banner"
            loading="lazy"
            style={{ width: 1500, height: 500 }}
          />
        </div>
        <div>
          <Image
            src={Daisy2}
            alt="Banner"
            loading="lazy"
            style={{ width: 1500, height: 500 }}
          />
        </div>
        <div>
          <Image
            src={Daisy3}
            alt="Banner"
            loading="lazy"
            style={{ width: 1500, height: 500 }}
          />
        </div>
        <div>
          <Image
            src={Daisy4}
            alt="Banner"
            loading="lazy"
            style={{ width: 1500, height: 500 }}
          />
        </div>
        <div>
          <Image
            src={Daisy5}
            alt="Banner"
            loading="lazy"
            style={{ width: 1500, height: 500 }}
          />
        </div>
      </Carousel>
    </div>
  );
}
