package com.congthanh.project.repository.ecommerce.payment;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class PaymentCustomRepositoryImpl implements PaymentCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;
}
