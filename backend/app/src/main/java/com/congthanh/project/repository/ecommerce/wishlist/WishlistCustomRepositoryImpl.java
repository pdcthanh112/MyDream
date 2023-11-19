package com.congthanh.project.repository.ecommerce.wishlist;

import com.congthanh.project.entity.ecommerce.Wishlist;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

public class WishlistCustomRepositoryImpl implements WishlistCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public boolean addProductToWishlist(String customerId, String productId) {
        String sql = "INSERT INTO wishlist_item (wishlist_id, product_id) VALUES ((SELECT id FROM wishlist WHERE customer = :customerId), :productId)";
        TypedQuery<Wishlist> query = entityManager.createQuery(sql, Wishlist.class);
        query.setParameter("customerId", customerId);
        query.setParameter("productId", productId);
        return query.executeUpdate() > 0;
    }

    @Override
    public boolean removeProductFromWishlist(String customerId, String productId) {
        String sql = "DELETE FROM wishlist_item WHERE wishlist_id = (SELECT id FROM wishlist WHERE customer = :customerId) AND product_id = :productId";
        TypedQuery<Wishlist> query = entityManager.createQuery(sql, Wishlist.class);
        query.setParameter("customerId", customerId);
        query.setParameter("productId", productId);
        return query.executeUpdate() > 0;
    }
}
