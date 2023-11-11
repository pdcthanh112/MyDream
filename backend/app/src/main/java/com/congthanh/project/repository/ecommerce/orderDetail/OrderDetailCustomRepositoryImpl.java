package com.congthanh.project.repository.ecommerce.orderDetail;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class OrderDetailCustomRepositoryImpl implements OrderDetailCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;
}
