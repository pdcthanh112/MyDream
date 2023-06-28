package com.congthanh.project.serviceImplement.ecommerce;

import com.congthanh.project.dto.ecommerce.CartItemDTO;
import com.congthanh.project.dto.ecommerce.ProductDTO;
import com.congthanh.project.entity.ecommerce.Cart;
import com.congthanh.project.entity.ecommerce.CartItem;
import com.congthanh.project.entity.ecommerce.Product;
import com.congthanh.project.repository.ecommerce.CartItemRepository;
import com.congthanh.project.repository.ecommerce.CartRepository;
import com.congthanh.project.repository.ecommerce.ProductRepository;
import com.congthanh.project.service.ecommerce.CartItemService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
public class CartItemServiceImplement implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public CartItem addToCart(String productId, int quantity, String cartId) {
        CartItem checkExistProduct = cartItemRepository.checkExistProductFromCart(cartId, productId);
        if (checkExistProduct == null) {
            Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException(" not found"));
            Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("not found"));
            CartItem cartItem = CartItem.builder()
                    .product(product)
                    .quantity(quantity)
                    .cart(cart)
                    .createdDate(Timestamp.valueOf(LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"))))
                    .build();
            return  cartItemRepository.save(cartItem);
        } else {
            checkExistProduct.setQuantity(checkExistProduct.getQuantity() + quantity);
            return cartItemRepository.save(checkExistProduct);
        }
    }

    @Override
    public CartItemDTO updateCartItem(String cartItemId, int quantity) {
        CartItem cartItem = cartItemRepository.findById(cartItemId).orElseThrow();
        cartItem.setQuantity(quantity);
        CartItem result = cartItemRepository.save(cartItem);
        CartItemDTO response = CartItemDTO.builder()
                .id(result.getId())
                .quantity(result.getQuantity())
                .product(ProductDTO.builder()
                        .id(result.getProduct().getId())
                        .name(result.getProduct().getName())
                        .category(result.getProduct().getCategory().getName())
                        .subcategory(result.getProduct().getSubcategory().getName())
                        .quantity(result.getProduct().getQuantity())
                        .price(result.getProduct().getPrice())
                        .ratingVote(result.getProduct().getRatingVote())
                        .ratingValue(result.getProduct().getRatingValue())
                        .production(result.getProduct().getProduction())
                        .image(result.getProduct().getImage())
                        .description(result.getProduct().getDescription())
                        .sold(result.getProduct().getSold())
                        .status(result.getProduct().getStatus())
                        .build())
                .cartId(result.getCart().getId())
                .build();
        return response;
    }

    @Override
    public boolean deleteCartItem(String cartItemId) {
        try {
            cartItemRepository.deleteById(cartItemId);
//            cartItemRepository.deleteCartItemById(cartItemId);
            return true;
        } catch (Exception e) {
            return false;
        }

    }
}
