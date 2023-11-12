package com.congthanh.project.repository.ecommerce.review;

import com.congthanh.project.dto.ecommerce.utils.RatingStarDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;


public class ReviewCustomRepositoryImpl implements ReviewCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public RatingStarDTO getReviewStatsFromProduct(String productId) {
        String sql = "SELECT SUM(rating), AVG(rating) FROM Review  WHERE product.id = :productId";
        Query query = entityManager.createQuery(sql);
        query.setParameter("productId", productId);
        Object[] result = (Object[]) query.getSingleResult();

        int vote = result[0] != null ? (int) result[0] : 0;
        float value = result[1] != null ? (float) result[1] : 0;

        return new RatingStarDTO(vote, value);
//        return query.getResultList();
    }
}
