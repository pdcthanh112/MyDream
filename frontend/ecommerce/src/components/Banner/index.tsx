import { Carousel } from 'antd';
import Image from 'next/image';
import Banner1 from '@assets/images/banner1.jpg';
import Banner2 from '@assets/images/banner2.jpg';
import Banner3 from '@assets/images/banner3.jpg';

const Banner = (): React.ReactElement => {

  const carousel = [Banner1, Banner2, Banner3];

  return (
    <Carousel  style={{ width: '99vw' }}>
      {carousel.map((item) => (
        <Image key={1} src={item} alt="Banner" loading="lazy" />
      ))}
    </Carousel>
  );
};

export default Banner;
