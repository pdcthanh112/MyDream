package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.CartDTO;
import com.congthanh.project.entity.ecommerce.Cart;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartService {

  CartDTO getCartById(String id);

  List<CartDTO> getActiveCartByCustomerId(String customerId);

  Cart createCart(CartDTO cartDTO);

  Cart updateCart(CartDTO cartDTO);

  boolean checkout(String cartId);

  boolean deleteCart(String cartId);

}
