package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.CartItemDTO;
import com.congthanh.project.entity.ecommerce.Cart;
import com.congthanh.project.entity.ecommerce.CartItem;

public interface CartItemService {

    CartItem addToCart(String productId, int quantity, String cartId);

    CartItemDTO updateCartItem(String cartItemId, int quantity);

    boolean deleteCartItem(String cartItemId);
}
