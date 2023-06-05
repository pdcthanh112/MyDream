package com.congthanh.project.serviceImplement.ecommerce;

import com.congthanh.project.constant.common.StateStatus;
import com.congthanh.project.dto.ecommerce.CartDTO;
import com.congthanh.project.entity.ecommerce.Cart;
import com.congthanh.project.repository.ecommerce.CartRepository;
import com.congthanh.project.service.ecommerce.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;


@Service
public class CartServiceImplement implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public List<CartDTO> getAllActiveCartByCustomerId(String customerId) {
        Cart result = cartRepository.findCartByCustomerId("b985c96b-5c07-4eac-ac63-db2d077a4f51");
        return null;
    }

    @Override
    public Cart createCart(CartDTO cartDTO) {
        Cart cart = Cart.builder()
                .customerId(cartDTO.getCustomerId())
                .createdDate(Timestamp.valueOf(LocalDateTime.now()))
                .status(StateStatus.STATUS_ACTIVE)
                .build();
        Cart response = cartRepository.save(cart);
        return response;
    }

    @Override
    public Cart updateCart(CartDTO cartDTO) {
        return null;
    }

    @Override
    public boolean checkout(String cartId) {
        return cartRepository.checkoutCart(cartId);
    }

}

