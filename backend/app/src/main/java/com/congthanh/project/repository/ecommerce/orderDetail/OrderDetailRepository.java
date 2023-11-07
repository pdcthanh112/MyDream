package com.congthanh.project.repository.ecommerce.orderDetail;

import com.congthanh.project.entity.ecommerce.OrderDetail;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface OrderDetailRepository extends JpaRepository<OrderDetail, String>, OrderDetailCustomRepository {
}
