package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.CartDTO;
import com.congthanh.project.entity.ecommerce.Cart;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartService {

    public Cart getCartById(String id);

    public List<CartDTO> getActiveCartByCustomerId(String customerId);

    public Cart createCart(CartDTO cartDTO);

    public Cart updateCart(CartDTO cartDTO);

    public boolean checkout(String cartId);

    public boolean deleteCart(String cartId);

}
