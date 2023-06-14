package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.dto.ecommerce.ProductDTO;
import com.congthanh.project.entity.ecommerce.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, String> {

    Optional<Product> findById(String id);

    Optional<Product> findByName(String name);

    Page<Product> findByCategoryId(int categoryId, Pageable pageable);

    Page<Product> findBySubcategoryId(int categoryId, Pageable pageable);

    @Modifying
    @Query(nativeQuery = true, value = "UPDATE mydream.product SET status = 'Deleted' WHERE id = ?1 ")
    boolean deleteProduct(String id);

//    @Query(nativeQuery = true, value = "SELECT product.id, product.name, category.id as category,\n" +
//            " subcategory.id as subcategory, price, quantity, description,\n" +
//            "image, sold, production, rating.vote as ratingVote, rating.value as rating, product.status as status\n" +
//            "FROM product JOIN category on product.category = category.id\n" +
//            "\t\t\tJOIN subcategory on product.subcategory = subcategory.id\n" +
//            "\t\t\tJOIN rating on product.rating = rating.id\n" +
//            "WHERE CONCAT(product.name, category.name, subcategory.name) ILIKE ?1")
//    public List<Product> searchProduct(String keyword);

    @Query(nativeQuery = true, value = "SELECT product.*\n" +
            "FROM product  JOIN category on product.category = category.id\n" +
            "JOIN subcategory on product.subcategory = subcategory.id\n" +
            "JOIN rating on product.rating = rating.id\n" +
            "WHERE CONCAT(product.name, category.name, subcategory.name) ILIKE ?1")
    public List<Product> searchProduct(String keyword);
}
