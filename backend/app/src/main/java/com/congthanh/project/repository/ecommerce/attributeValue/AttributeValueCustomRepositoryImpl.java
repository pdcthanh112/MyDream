package com.congthanh.project.repository.ecommerce.attributeValue;

import com.congthanh.project.entity.ecommerce.AttributeValue;
import jakarta.persistence.*;

import java.util.List;

public class AttributeValueCustomRepositoryImpl implements AttributeValueCustomRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Tuple> getAttributeOfProduct(String productId) {
        try {
        String sql = "SELECT av.id as id, pa.id as attributeId, pa.name, av.product, av.value FROM product_attribute pa JOIN attribute_value av ON pa.id = av.attribute WHERE av.product = ?1";
        Query query = entityManager.createNativeQuery(sql, Tuple.class);
        query.setParameter(1, productId);
        return query.getResultList();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public AttributeValue findAttributeValueOfProduct(Long attributeId, String productId) {
        try {
            String sql = "SELECT a FROM AttributeValue a WHERE a.attribute = :attributeId AND a.product = :productId";
            TypedQuery<AttributeValue> query = entityManager.createQuery(sql, AttributeValue.class);
            query.setParameter("attributeId", attributeId);
            query.setParameter("productId", productId);
            return query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}
