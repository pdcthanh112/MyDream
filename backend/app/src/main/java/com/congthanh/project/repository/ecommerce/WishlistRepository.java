package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.entity.ecommerce.Wishlist;
import jakarta.persistence.Tuple;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {

    @Query(nativeQuery = true, value = "SELECT wishlist.id as wishlistId, customer, product.id as productId, description, image, product.name, price, quantity, sold, product.status, category.name as category, subcategory.name as subcategory, production, rating.vote as vote, rating.value as value\n" +
            "FROM wishlist JOIN wishlist_product ON wishlist.id = wishlist_product.wishlist_id\n" +
            "JOIN product ON wishlist_product.product_id = product.id\n" +
            "JOIN category ON product.category = category.id\n" +
            "JOIN subcategory ON product.subcategory = subcategory.id\n" +
            "JOIN rating ON product.rating = rating.id\n" +
            "WHERE wishlist.customer = ?1")
    List<Tuple> findWishlistByCustomer(String customerId);

    @Query(nativeQuery = true, value = "SELECT id, customer FROM wishlist WHERE customer = ?1")
    Tuple checkExistWishlist(String customerId);

    @Modifying
    @Query(nativeQuery = true, value = "INSERT INTO wishlist_product (wishlist_id, product_id) VALUES (?1, ?2)")
    int addProductToWishlist(int wishlistId, String productId);
}
