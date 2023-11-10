import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddToCartForm, CreateCartForm, UpdateCartItemForm } from '@models/CartModel';
import { addProductToCart, createNewCart, deleteCart, deleteCartItem, updateCartItem } from 'api/cartApi';

export const useCreateNewCart = () => {
  const queryClient = useQueryClient();
  return useMutation(async (data: CreateCartForm) => await createNewCart(data), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation(async (cartId: string) => await deleteCart(cartId), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useAddProductToCart = () => {
  const queryClient = useQueryClient();
  return useMutation(async (data: AddToCartForm) => await addProductToCart({ productId: data.productId, quantity: data.quantity, cartId: data.cartId }), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation(async (data: UpdateCartItemForm) => await updateCartItem(data.itemId, data.quantity), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart']});
    },
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation(async (itemId: string) => await deleteCartItem(itemId), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
