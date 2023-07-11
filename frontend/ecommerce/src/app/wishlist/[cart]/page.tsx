'use client'
import { ReactElement } from 'react';
import RootLayout from 'app/layout';
import { useAppSelector } from '@redux/store';
import { useQuery } from '@tanstack/react-query';
import { Customer } from 'models/CustomerModel';
import { getWishlistByCustomer } from '@apis/wishlistApi';
import { Product } from 'models/ProductModel';
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material';
import Image from 'next/image';
import DeleteIcon from '@assets/icons/delete-icon.png';
import Button from '@components/Button';
import DefaultImage from '@assets/images/default-image.jpg';
import { stateStatus } from '@utils/constants';
import { addToCart } from '@apis/cartItemApi';
import { toast } from 'react-toastify';

const Wishlist = () => {

  const currentUser: Customer = useAppSelector((state) => state.auth.login.currentUser);

  const { data: wishlist, isLoading } = useQuery(['cart'], async () => await getWishlistByCustomer(currentUser.userData.accountId).then((response) => response.data));

  const checkStatus = (quantity: number, status: string) => {
    if (status === stateStatus.ACTIVE) {
      if (quantity > 0) {
        return <span className="text-status_active-text bg-status_active-background px-2 py-1 rounded">In stock</span>;
      } else {
        return <span className="text-status_inactive-text bg-status_inactive-background px-2 py-1 rounded">Out stock</span>;
      }
    } else {
      return <span className="text-gray-500 bg-gray-300 px-2 py-1 rounded">Inactive</span>;
    }
  };

  const handleAddProductToCart = (productId: string) => {
    // addToCart('CART_ID',1, productId)
    toast.success('Edit successfully');
  };

  return (
    <>
      {isLoading ? (
        <span>Loading</span>
      ) : (
        <div className="bg-white">
          <TableContainer component={Paper} style={{ width: '100vw' }}>
            <Table style={{ width: '85vw', margin: '0 auto' }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ paddingLeft: '10rem', fontSize: '1.1rem', width: '40%' }}>Product name</TableCell>
                  <TableCell align="center" style={{ fontSize: '1.1rem' }}>
                    Category
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: '1.1rem' }}>
                    Price
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: '1.1rem' }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wishlist.product.map((item: Product) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row" style={{ display: 'flex' }}>
                      <Image src={item.image || DefaultImage} alt="Product image" width={100} />
                      <span style={{ display: 'flex', alignItems: 'center', marginLeft: 20 }}>{item.name}</span>
                    </TableCell>
                    <TableCell align="center">{item.category}</TableCell>
                    <TableCell align="center">{item.price}</TableCell>
                    <TableCell align="center">{checkStatus(item.quantity, item.status)}</TableCell>
                    <TableCell align="right" style={{ width: '20%' }}>
                      <div className="flex justify-end">
                        <Image
                          src={DeleteIcon}
                          alt="Delete Icon"
                          title="Remove item"
                          width={20}
                          className="hover:cursor-pointer opacity-50 hover:opacity-100"
                          // onClick={() => handleDeleteCartItem(item.id)}
                        />
                      </div>
                      <Button className="bg-yellow-400 w-40" onClick={() => handleAddProductToCart(item.id)}>
                        Add to Cart
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default Wishlist;
