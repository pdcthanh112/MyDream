package com.congthanh.project.repository.ecommerce.order;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class OrderCustomRepositoryImpl implements OrderCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;
}
