package com.congthanh.project.repository.ecommerce.cart;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class CartCustomRepositoryImpl implements CartCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;
}
