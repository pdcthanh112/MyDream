package com.congthanh.project.serviceImpl.ecommerce;

import com.congthanh.project.constant.common.StateStatus;
import com.congthanh.project.dto.ecommerce.*;
import com.congthanh.project.entity.ecommerce.*;
import com.congthanh.project.exception.ecommerce.NotFoundException;
import com.congthanh.project.model.ecommerce.mapper.CartMapper;
import com.congthanh.project.model.ecommerce.mapper.ProductMapper;
import com.congthanh.project.repository.ecommerce.cartItem.CartItemRepository;
import com.congthanh.project.repository.ecommerce.cart.CartRepository;
import com.congthanh.project.service.ecommerce.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartMapper cartMapper;

    @Autowired
    private ProductMapper productMapper;

    @Override
    public CartDTO getCartById(String id) {
        Cart cart = cartRepository.findById(id).orElseThrow(() -> new NotFoundException("Cart NOT FOUND"));

        CartDTO result = new CartDTO();
        result.setId(cart.getId());
        result.setName(cart.getName());
        result.setCustomerId(cart.getCustomerId());
        result.setCreatedDate(cart.getCreatedDate());
        result.setStatus(cart.getStatus());

        List<CartItem> listCartItem = cartItemRepository.getAllCartItemByCartId(cart.getId());
        if (listCartItem.size() > 0) {
            Set<CartItemDTO> cartItems = new HashSet<>();
            for (CartItem cartItemItem : listCartItem) {
                CartItemDTO cartItemTmp = new CartItemDTO();
                cartItemTmp.setId(cartItemItem.getId());
                cartItemTmp.setQuantity(cartItemItem.getQuantity());
                cartItemTmp.setCart(cartMapper.mapCartEntityToDTO(cart));
                cartItemTmp.setCreatedDate(cartItemItem.getCreatedDate());
                cartItemTmp.setProduct(productMapper.mapProductEntityToDTO(cartItemItem.getProduct()));

                cartItems.add(cartItemTmp);
            }
            result.setCartItems(cartItems);
        }
        return result;
    }

    @Override
    public List<CartDTO> getActiveCartByCustomerId(String customerId) {
        List<CartDTO> response = new ArrayList<>();
        List<Cart> listCart = cartRepository.findActiveCartByCustomerId(customerId);
        if (listCart.size() > 0) {
            for (Cart cart : listCart) {
                CartDTO cartTmp = new CartDTO();
                cartTmp.setId(cart.getId());
                cartTmp.setName(cart.getName());
                cartTmp.setCustomerId(cart.getCustomerId());
                cartTmp.setStatus(cart.getStatus());
                cartTmp.setCreatedDate(cart.getCreatedDate());
                List<CartItem> listCartItem = cartItemRepository.getAllCartItemByCartId(cart.getId());
                if (listCartItem.size() > 0) {
                    Set<CartItemDTO> cartItems = new HashSet<>();
                    for (CartItem cartItemItem : listCartItem) {
                        CartItemDTO cartItemTmp = new CartItemDTO();
                        cartItemTmp.setId(cartItemItem.getId());
                        cartItemTmp.setQuantity(cartItemItem.getQuantity());
                        cartItemTmp.setCart(cartMapper.mapCartEntityToDTO(cart));
                        cartItemTmp.setProduct(productMapper.mapProductEntityToDTO(cartItemItem.getProduct()));

                        cartItems.add(cartItemTmp);
                    }
                    cartTmp.setCartItems(cartItems);
                }
                response.add(cartTmp);
            }
        } else {
            return null;
        }
        return response;
    }

    @Override
    public CartDTO createCart(CartDTO cartDTO) {
        Cart cart = Cart.builder()
                .name(cartDTO.getName())
                .customerId(cartDTO.getCustomerId())
                .createdDate(new Date().getTime())
                .status(StateStatus.STATUS_ACTIVE)
                .build();
        Cart result = cartRepository.save(cart);
        CartDTO response = cartMapper.mapCartEntityToDTO(result);
        return response;
    }

    @Override
    public Cart updateCart(CartDTO cartDTO) {
        return null;
    }

    @Override
    public boolean deleteCart(String cartId) {
        try {
            cartRepository.deleteById(cartId);
            return true;
        } catch (Exception e) {
            throw new NotFoundException("id khong ton tai");
        }
    }

}




