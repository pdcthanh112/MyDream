package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.entity.ecommerce.Product;
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

    Wishlist findByCustomer(String customerId);

     Object findProductByCustomer(String customerId);
//    public List<Product> findProductByCustomer(String customerId);

    @Query(nativeQuery = true, value = "SELECT id, customer FROM wishlist WHERE customer = ?1")
    Tuple checkExistWishlist(String customerId);

    @Modifying
    @Query(nativeQuery = true, value = "INSERT INTO wishlist_product (wishlist_id, product_id) VALUES (?1, ?2)")
    int addProductToWishlist(int wishlistId, String productId);
}
