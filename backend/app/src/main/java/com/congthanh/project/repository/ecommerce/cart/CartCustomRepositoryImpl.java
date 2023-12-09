package com.congthanh.project.repository.ecommerce.cart;

import com.congthanh.project.entity.ecommerce.Cart;
import com.congthanh.project.enums.ecommerce.CartStatus;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;

import java.util.List;

public class CartCustomRepositoryImpl implements CartCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Cart> findActiveCartByCustomerId(String customerId) {
        String sql = "SELECT c FROM Cart c WHERE customer = :customerId AND status = :status ORDER BY createdDate desc";
        TypedQuery<Cart> query = entityManager.createQuery(sql, Cart.class);
        query.setParameter("customerId", customerId);
        query.setParameter("status", CartStatus.ACTIVE.name());
        return query.getResultList();
    }

    @Override
    public Cart getDefaultCartOfCustomer(String customerId) {
        String sql = "SELECT c FROM Cart c WHERE c.customer = :customerId AND c.isDefault = true";
        TypedQuery<Cart> query = entityManager.createQuery(sql, Cart.class);
        query.setParameter("customerId", customerId);
        return query.getSingleResult();
    }

    @Override
    public boolean setDefaultCartForCustomer(String customerId, String cartId) {
        String resetDefault = "UPDATE cart SET is_default = false WHERE customer = ?1";
        Query resetDefaultQuery = entityManager.createNativeQuery(resetDefault);
        resetDefaultQuery.setParameter(1, customerId);
        resetDefaultQuery.executeUpdate();

        String updateSingleCartSql = "UPDATE cart SET is_default = true WHERE id = ?1";
        Query updateSingleCartQuery = entityManager.createNativeQuery(updateSingleCartSql);
        updateSingleCartQuery.setParameter(1, cartId);
        return updateSingleCartQuery.executeUpdate() > 0;
    }
}
