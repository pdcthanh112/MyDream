package com.congthanh.project.repository.ecommerce.review;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.util.List;

public class ReviewCustomRepositoryImpl implements ReviewCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Object> getReviewStatsFromProduct(String productId) {
        String sql = "SELECT SUM(rating), AVG(rating) FROM Review  WHERE product.id = :productId";
        Query query = entityManager.createQuery(sql);
        query.setParameter("productId", productId);

        return query.getResultList();
    }
}
