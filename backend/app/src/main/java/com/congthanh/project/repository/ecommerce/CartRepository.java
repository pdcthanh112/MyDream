package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.entity.ecommerce.Cart;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface CartRepository extends JpaRepository<Cart, String> {

    Optional<Cart> findById(String id);

    @Query(nativeQuery = true, value = "SELECT * FROM cart WHERE customerid = ?1 AND status = 'Active'")
    List<Cart> findCartByCustomerId(String customerId);

    @Query(nativeQuery = true, value = "UPDATE cart SET status = 'PAID' WHERE id = ?1")
    boolean checkoutCart(String cartId);

    void deleteById(String cartId);
}
