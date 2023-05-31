package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.entity.ecommerce.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    Optional<Product> findById(String id);

    Optional<Product> findByName(String name);

    @Query(nativeQuery = true, value = "SELECT product.id, product.name, category.name as category, subcategory.name as subcategory, rating.vote, rating.value, price, quantity, image, description, sold " +
            "FROM product join category on product.category = category.id " +
            "join subcategory on product.subcategory = subcategory.id " +
            "left join rating on product.id = rating.product")
    List<Product> getAllProduct();

    @Modifying
    @Query(nativeQuery = true, value = "UPDATE mydream.product SET status = 'Deleted' WHERE id = ?1 ")
    boolean deleteProduct(String id);
}
