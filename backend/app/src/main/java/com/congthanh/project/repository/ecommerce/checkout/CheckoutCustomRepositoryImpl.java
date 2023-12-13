package com.congthanh.project.repository.ecommerce.checkout;

import com.congthanh.project.entity.ecommerce.Checkout;
import com.congthanh.project.model.ecommerce.request.CreateCheckoutDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.math.BigDecimal;

public class CheckoutCustomRepositoryImpl implements CheckoutCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;

}
