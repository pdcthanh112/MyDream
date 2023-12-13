package com.congthanh.project.repository.ecommerce.checkout;

import com.congthanh.project.entity.ecommerce.Checkout;
import com.congthanh.project.model.ecommerce.request.CreateCheckoutDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
@Transactional
public interface CheckoutCustomRepository {

}
