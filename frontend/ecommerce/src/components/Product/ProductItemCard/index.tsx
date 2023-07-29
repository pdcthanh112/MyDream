import { Product } from '@models/ProductModel';
import Image from 'next/image';
import Daisy from '@assets/images/daisy1.jpg';
import { Card, Rating, Icon } from '@mui/material';
import Button from '@components/Button';
import { useRouter } from 'next/navigation';
import { roundNumber } from '@utils/helper';
import {ShoppingCart as ShoppingCartIcon, Source as SourceIcon, Favorite as FavoriteIcon} from '@mui/icons-material';
import { addToWishlist } from '@apis/wishlistApi';
import { useAppSelector } from '@redux/store';
import { addToCart } from '@apis/cartItemApi';
import AuthModal from '@components/AuthModal';
import { Customer } from '@models/CustomerModel';

interface ProductProps {
  product: Product;
}

export default function ProductItemCard({ product }: ProductProps) {
  const currentUser: Customer = useAppSelector((state) => state.auth.login.currentUser);

  const router = useRouter();

  const handleAddToCart = (productId: string) => {
    if (currentUser) {
      addToCart('CART_ID', 1, productId);
    } else {
      <AuthModal />;
    }
  };

  const handleAddToWishlist = (productId: string) => {
    if (currentUser) {
      addToWishlist(currentUser.userData.accountId, productId);
    } else {
      <AuthModal />;
    }
  };

  return (
    <Card key={product.id} title={product.name} className=" bg-white z-30 p-3 text-sm hover:cursor-pointer">
      <div className="w-full h-auto flex items-center justify-center relative group">
        <Image src={product.image || Daisy} width={220} alt="Product image" />
        <ul className="w-full h-36 bg-gray-100 absolute -bottom-36 flex flex-col items-end justify-center gap-2 font-semibold px-2 border-l border-r group-hover:bottom-0 duration-700">
          <li className="productLi" onClick={() => handleAddToCart(product.id)}>
            Add to Cart
            <Icon component={ShoppingCartIcon} />
          </li>
          <li className="productLi" onClick={() => router.push(`/product/${product.id}`)}>
            View detail
            <Icon component={SourceIcon} />
          </li>
          <li className="productLi" onClick={() => handleAddToWishlist(product.id)}>
            Add to Wishlist
            <Icon component={FavoriteIcon} />
          </li>
        </ul>
      </div>

      <div className="relative z-50 bg-white">
        <h1 className="truncate opacity-70 hover:opacity-100 my-2">{product.name}</h1>

        <div className="mb-5 flex justify-end font-medium text-yellow-500 text-lg">
          <span>${product.price}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center">
            <Rating precision={0.1} value={product.ratingValue} size="small" readOnly />
            <span className="ml-1">{product.ratingValue.toFixed(1)}</span>
          </span>

          <span className="mr-1">{roundNumber(product.ratingVote)} rating</span>
        </div>

        <span className="italic ml-2">Sold: {product.sold}</span>

        <Button className="w-full bg-yellow-400">Add to Cart</Button>
      </div>
    </Card>
  );
}
