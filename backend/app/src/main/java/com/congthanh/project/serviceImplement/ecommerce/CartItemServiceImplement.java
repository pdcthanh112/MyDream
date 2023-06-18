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
                    .build();
            return cartItemRepository.save(cartItem);
        } else {
            checkExistProduct.setQuantity(checkExistProduct.getQuantity() + quantity);
            return cartItemRepository.save(checkExistProduct);
        }
    }

    @Override
    public CartItem updateCartItem(String cartItemId, int quantity) {
        CartItem cartItem = cartItemRepository.findById(cartItemId).orElseThrow();
        cartItem.setQuantity(quantity);
        CartItem result = cartItemRepository.save(cartItem);
        return result;
    }

    @Override
    public boolean deleteCartItem(String cartItemId) {
        System.out.println("+++++++++++++++++++++++++++++++++++++++++++++++" + cartItemId);
        try {
            cartItemRepository.deleteById(cartItemId);
//            cartItemRepository.deleteCartItemById(cartItemId);
            return true;
        } catch (Exception e) {
            return false;
        }

    }
}
