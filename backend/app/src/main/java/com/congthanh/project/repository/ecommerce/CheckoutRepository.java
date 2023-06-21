package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.entity.ecommerce.Checkout;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface CheckoutRepository extends JpaRepository<Checkout, Integer> {

}
