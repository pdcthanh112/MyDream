import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import Banner1 from '@assets/images/banner1.jpg';
import Banner2 from '@assets/images/banner2.jpg';
import Banner3 from '@assets/images/banner3.jpg';

const Banner = (): React.ReactElement => {

  const carousel = [Banner1, Banner2, Banner3]

  return (
    <Carousel
      autoPlay
      infiniteLoop
      showArrows={true}
      showStatus={false}
      showThumbs={false}
      showIndicators={true}
      interval={5000}
    >
      {carousel.map((item) => (
        <div key={1}>
          <Image
            src={item}
            alt="Banner"
            loading="lazy"
            style={{ width: 1550, height: 450 }}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default Banner;
