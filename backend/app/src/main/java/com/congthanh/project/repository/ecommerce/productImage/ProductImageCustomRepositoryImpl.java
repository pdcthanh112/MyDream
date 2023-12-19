package com.congthanh.project.repository.ecommerce.productImage;

import com.congthanh.project.entity.ecommerce.ProductImage;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

import java.util.List;

public class ProductImageCustomRepositoryImpl implements ProductImageCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<ProductImage> getImageByProduct(String productId) {
        String sql = "SELECT i FROM ProductImage i WHERE i.product = :productId";
        TypedQuery<ProductImage> query = entityManager.createQuery(sql, ProductImage.class);
        query.setParameter("productId", productId);
        return query.getResultList();
    }
}
