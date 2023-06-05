package com.congthanh.project.serviceImplement.ecommerce;

import com.congthanh.project.dto.ecommerce.CartItemDTO;
import com.congthanh.project.entity.ecommerce.Cart;
import com.congthanh.project.entity.ecommerce.CartItem;
import com.congthanh.project.entity.ecommerce.Product;
import com.congthanh.project.repository.ecommerce.CartItemRepository;
import com.congthanh.project.repository.ecommerce.CartRepository;
import com.congthanh.project.repository.ecommerce.ProductRepository;
import com.congthanh.project.service.ecommerce.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
        System.out.println("===============================================");
        Optional<Cart> cart = cartRepository.findById(cartId);
        System.out.println("carttttttttttttttttttttt"+ cart.get());
        Optional<Product> product = productRepository.findById(productId);
        System.out.println("producttttttttttttttttttttttttt"+ product.get());
        CartItem cartItem = CartItem.builder()
                .product(product.get())
                .quantity(quantity)
                .cart(cart.get())
                .build();
        CartItem result = cartItemRepository.save(cartItem);
        return result;
    }

    @Override
    public CartItem updateCartItem(CartItemDTO cartItemDTO) {
        CartItem cartItem = CartItem.builder()
                .quantity(cartItemDTO.getQuantity())
                .build();
        CartItem result = cartItemRepository.save(cartItem);
        return result;
    }

    @Override
    public boolean deleteCartItem(String cartItemId) {
        try {
            cartItemRepository.deleteById(cartItemId);
            return true;
        } catch (Exception e) {
            return false;
        }

    }
}
