package com.congthanh.project.repository.ecommerce.cart;

import com.congthanh.project.entity.ecommerce.Cart;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

public class CartCustomRepositoryImpl implements CartCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Cart getDefaultOfCustomer(String customerId) {
        String sql = "SELECT c FROM Cart c WHERE c.customerId = :customerId AND c.isDefault = true";
        TypedQuery<Cart> query = entityManager.createQuery(sql, Cart.class);
        query.setParameter("customerId", customerId);
        return query.getSingleResult();
    }

    @Override
    public boolean setDefaultCartForCustomer(String customerId, String cartId) {
        String resetDefault = "UPDATE Cart SET isDefault = false WHERE customerId = :customerId";
        TypedQuery<Cart> query = entityManager.createQuery(resetDefault, Cart.class);
        query.setParameter("customerId", customerId);
        query.executeUpdate();

        String updateSingleCartSql = "UPDATE Cart SET isDefault = true WHERE id = :cartId";
        TypedQuery<Cart> updateSingleCartQuery = entityManager.createQuery(updateSingleCartSql, Cart.class);
        updateSingleCartQuery.setParameter("cartId", cartId);
        return updateSingleCartQuery.executeUpdate() > 0;
    }
}
