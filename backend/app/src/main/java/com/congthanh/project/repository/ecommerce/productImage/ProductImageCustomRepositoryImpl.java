package com.congthanh.project.repository.ecommerce.productImage;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class ProductImageCustomRepositoryImpl implements ProductImageCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;
}
