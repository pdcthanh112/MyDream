package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.CartItemDTO;
import com.congthanh.project.entity.ecommerce.Cart;
import com.congthanh.project.entity.ecommerce.CartItem;

public interface CartItemService {

    public CartItem addToCart(String productId, int quantity, String cartId);

    public CartItem updateCartItem(CartItemDTO cartItemDTO);

    public boolean deleteCartItem(String cartItemId);
}
