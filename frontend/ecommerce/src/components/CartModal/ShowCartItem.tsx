import { useEffect, useState } from 'react';
import { CartItem, ProductImage } from '@models/type';
import { useRouter } from 'next/router';
import { getDefaultImageByProductId } from 'api/productApi';
import DefaultImage from '@assets/images/default-image.jpg';
import Image from 'next/image';

type PropsType = {
  item: CartItem;
};

const ShowCartItem = ({ item }: PropsType) => {
  const router = useRouter();

  const [productImage, setProductImage] = useState<ProductImage>();

  useEffect(() => {
    const fetchData = async () => {
      await getDefaultImageByProductId(item.product.id).then(response => {
        if (response && response.data) {
          setProductImage(response.data);
        }
      });
    };
    fetchData();
  }, []);

  return (
    <div
      key={item.id}
      className="flex justify-between px-5 py-2 hover:bg-gray-100 hover:cursor-pointer"
      title={item.product.name}
      onClick={() => router.push(`product/${item.product.id}`)}>
      <span className="flex items-center">
        <Image src={productImage?.imagePath || DefaultImage} alt={productImage?.alt || ""} width={40} height={40} className="border border-gray-300" />
        <h4 className="truncate ml-2 w-56 text-sm">{item.product.name}</h4>
      </span>
      <span className="text-yellow-500">${item.product.price}</span>
    </div>
  );
};

export default ShowCartItem;
