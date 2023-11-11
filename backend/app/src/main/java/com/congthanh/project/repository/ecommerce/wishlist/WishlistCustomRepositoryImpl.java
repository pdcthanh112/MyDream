package com.congthanh.project.repository.ecommerce.wishlist;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class WishlistCustomRepositoryImpl implements WishlistCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;
}
