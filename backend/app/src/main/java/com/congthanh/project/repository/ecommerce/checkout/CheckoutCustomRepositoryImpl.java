package com.congthanh.project.repository.ecommerce.checkout;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class CheckoutCustomRepositoryImpl implements CheckoutCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;
}
