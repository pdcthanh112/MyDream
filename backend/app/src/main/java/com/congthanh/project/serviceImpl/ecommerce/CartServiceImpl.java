package com.congthanh.project.serviceImpl.ecommerce;

import com.congthanh.project.constant.common.StateStatus;
import com.congthanh.project.dto.ecommerce.*;
import com.congthanh.project.entity.ecommerce.*;
import com.congthanh.project.exception.ecommerce.NotFoundException;
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
                cartItemTmp.setCartId(cart.getId());
                cartItemTmp.setCreatedDate(cartItemItem.getCreatedDate());
                cartItemTmp.setProduct(ProductDTO.builder()
                        .id(cartItemItem.getProduct().getId())
                        .name(cartItemItem.getProduct().getName())
                        .category(cartItemItem.getProduct().getCategory().getName())
                        .subcategory(cartItemItem.getProduct().getSubcategory().getName())
                        .quantity(cartItemItem.getProduct().getQuantity())
                        .price(cartItemItem.getProduct().getPrice())
                        .production(cartItemItem.getProduct().getProduction())
                        .sold(cartItemItem.getProduct().getSold())
                        .image(cartItemItem.getProduct().getImage())
                        .description(cartItemItem.getProduct().getDescription())
                        .slug(cartItemItem.getProduct().getSlug())
                        .status(cartItemItem.getProduct().getStatus())
                        .build());
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
                        cartItemTmp.setCartId(cart.getId());
                        cartItemTmp.setProduct(ProductDTO.builder()
                                .id(cartItemItem.getProduct().getId())
                                .name(cartItemItem.getProduct().getName())
                                .category(cartItemItem.getProduct().getCategory().getName())
                                .subcategory(cartItemItem.getProduct().getSubcategory().getName())
                                .quantity(cartItemItem.getProduct().getQuantity())
                                .price(cartItemItem.getProduct().getPrice())
                                .production(cartItemItem.getProduct().getProduction())
                                .sold(cartItemItem.getProduct().getSold())
                                .image(cartItemItem.getProduct().getImage())
                                .description(cartItemItem.getProduct().getDescription())
                                .status(cartItemItem.getProduct().getStatus())
                                .slug(cartItemItem.getProduct().getSlug())
                                .build());
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
    public Cart createCart(CartDTO cartDTO) {
        Cart cart = Cart.builder()
                .name(cartDTO.getName())
                .customerId(cartDTO.getCustomerId())
                .createdDate(new Date().getTime())
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





