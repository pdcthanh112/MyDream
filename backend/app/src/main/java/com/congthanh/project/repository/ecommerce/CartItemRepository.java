package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.entity.ecommerce.CartItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface CartItemRepository extends JpaRepository<CartItem, String> {

    @Query(nativeQuery = true, value = "SELECT * FROM cart_item WHERE cart = ?1")
    public List<CartItem> getAllCartItemByCartId(String cartId);

    @Query(nativeQuery = true, value = "SELECT cart_item.id, quantity, cart, product FROM cart_item JOIN cart ON cart_item.cart = cart.id WHERE cart = ?1 AND product = ?2 AND cart.status = 'Active'")
    public CartItem checkExistProductFromCart(String cartId, String productId);


}
