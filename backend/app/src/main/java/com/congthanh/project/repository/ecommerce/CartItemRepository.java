package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.entity.ecommerce.CartItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface CartItemRepository extends JpaRepository<CartItem, String> {
}
