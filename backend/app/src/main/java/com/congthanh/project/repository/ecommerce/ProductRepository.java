package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.entity.ecommerce.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, String> {

    Optional<Product> findById(String id);

    Optional<Product> findByName(String name);

    @Modifying
    @Query(nativeQuery = true, value = "UPDATE mydream.product SET status = 'Deleted' WHERE id = ?1 ")
    boolean deleteProduct(String id);
}
