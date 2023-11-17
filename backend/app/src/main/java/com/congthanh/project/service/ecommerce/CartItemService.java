package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.CartItemDTO;
import com.congthanh.project.entity.ecommerce.CartItem;

public interface CartItemService {

  CartItemDTO addToCart(String productId, int quantity, String cartId);

  CartItemDTO updateCartItem(String cartItemId, int quantity);

  boolean deleteCartItem(String cartItemId);

}
