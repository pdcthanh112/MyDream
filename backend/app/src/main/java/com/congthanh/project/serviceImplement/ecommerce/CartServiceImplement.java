package com.congthanh.project.serviceImplement.ecommerce;

import com.congthanh.project.constant.common.StateStatus;
import com.congthanh.project.dto.ecommerce.*;
import com.congthanh.project.entity.ecommerce.*;
import com.congthanh.project.repository.ecommerce.CartItemRepository;
import com.congthanh.project.repository.ecommerce.CartRepository;
import com.congthanh.project.repository.ecommerce.ProductRepository;
import com.congthanh.project.service.ecommerce.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
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
    public CartDTO getCartById(String id) {
        CartDTO result = new CartDTO();
        Optional<Cart> data = cartRepository.findById(id);
        System.out.println("CHECKKKKKKKKKKKKKKKKKKkk"+ data.get().getCartItems().size());
        if (data.isPresent()) {
            return result;
        } else {
            throw new RuntimeException("Cart NOT FOUND");
        }
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
                                .ratingVote(cartItemItem.getProduct().getRatingVote())
                                .ratingValue(cartItemItem.getProduct().getRatingValue())
                                .status(cartItemItem.getProduct().getStatus())
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
                .createdDate(Timestamp.valueOf(LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"))))
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





