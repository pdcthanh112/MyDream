package com.congthanh.project.repository.ecommerce.order;

import com.congthanh.project.entity.ecommerce.Order;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface OrderRepository extends JpaRepository<Order, String>, OrderCustomRepository {
}
