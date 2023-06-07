package com.congthanh.project.serviceImplement.ecommerce;

import com.congthanh.project.constant.common.StateStatus;
import com.congthanh.project.dto.ecommerce.CartDTO;
import com.congthanh.project.entity.ecommerce.*;
import com.congthanh.project.repository.ecommerce.CartItemRepository;
import com.congthanh.project.repository.ecommerce.CartRepository;
import com.congthanh.project.repository.ecommerce.ProductRepository;
import com.congthanh.project.service.ecommerce.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;


@Service
public class CartServiceImplement implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Cart getCartById(String id) {
        Optional<Cart> result = cartRepository.findById(id);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new RuntimeException("Cart NOT FOUND");
        }
    }

    @Override
    public List<Cart> getAllCartByCustomerId(String customerId) {
        List<Cart> response = new ArrayList<>();
        List<Cart> listCart = cartRepository.findCartByCustomerId(customerId);
        if (listCart.size() > 0) {
            for (Cart cart : listCart) {
                Cart cartTmp = new Cart();
                cartTmp.setId(cart.getId());
                cartTmp.setCustomerId(cart.getCustomerId());
                cartTmp.setStatus(cart.getStatus());
                cartTmp.setCreatedDate(cart.getCreatedDate());
                List<CartItem> listCartItem = cartItemRepository.getAllCartItemByCartId(cart.getId());
                if (listCartItem.size() > 0) {
                    Set<CartItem> cartItems = new HashSet<>();
                    for (CartItem cartItemItem : listCartItem) {
                        CartItem cartItemTmp = new CartItem();
                        cartItemTmp.setId(cartItemItem.getId());
                        cartItemTmp.setQuantity(cartItemItem.getQuantity());
                        cartItemTmp.setProduct(Product.builder()
                                .id(cartItemItem.getProduct().getId())
                                .name(cartItemItem.getProduct().getName())
                                .category(Category.builder()
                                        .id(cartItemItem.getProduct().getCategory().getId())
                                        .name(cartItemItem.getProduct().getCategory().getName())
                                        .status(cartItemItem.getProduct().getCategory().getStatus())
                                        .build())
//                                        .category(cartItemItem.getProduct().getCategory())
                                                .subcategory(Subcategory.builder()
                                                        .id(cartItemItem.getProduct().getSubcategory().getId())
                                                        .name(cartItemItem.getProduct().getSubcategory().getName())
                                                        .status(cartItemItem.getProduct().getSubcategory().getStatus())
                                                        .build())
//                                        .subcategory(cartItemItem.getProduct().getSubcategory())
                                .quantity(cartItemItem.getProduct().getQuantity())
                                .price(cartItemItem.getProduct().getPrice())
                                .production(cartItemItem.getProduct().getProduction())
                                .sold(cartItemItem.getProduct().getSold())
                                .image(cartItemItem.getProduct().getImage())
                                .description(cartItemItem.getProduct().getDescription())
                                .rating(Rating.builder()
                                        .vote(cartItemItem.getProduct().getRating().getVote())
                                        .value(cartItemItem.getProduct().getRating().getValue())
                                        .build())
                                .status(cartItemItem.getProduct().getStatus())
                                .build());
//                        cartItemTmp.setProduct(cartItemItem.getProduct());
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

    @Override
    public boolean deleteCart(String cartId) {
        try {
            cartRepository.deleteById(cartId);
            return true;
        } catch (Exception e) {
            throw new RuntimeException("id khong ton tai");
        }
    }

}





