package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.entity.ecommerce.Product;
import com.congthanh.project.entity.ecommerce.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {

    public Wishlist findByCustomer(String customerId);

    public List<Product> findProductByCustomer(String customerId);
}
