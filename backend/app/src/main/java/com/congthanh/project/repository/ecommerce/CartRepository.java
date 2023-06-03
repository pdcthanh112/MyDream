package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.entity.ecommerce.Cart;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface CartRepository extends JpaRepository<Cart, String> {

    Optional<Cart> findById(String id);

    @Query(nativeQuery = true, value = "SELE")
    Cart findCartByCustomerId(String customerId);
}
