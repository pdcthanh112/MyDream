package com.congthanh.project.repository.ecommerce.cartItem;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class CartItemCustomRepositoryImpl implements CartItemCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;
}
