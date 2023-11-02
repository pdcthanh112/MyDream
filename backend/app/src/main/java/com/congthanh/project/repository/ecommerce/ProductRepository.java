package com.congthanh.project.repository.ecommerce;

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

  @Query(nativeQuery = true, value = "SELECT product.*\n" +
          "FROM product  JOIN category on product.category = category.id\n" +
          "JOIN subcategory on product.subcategory = subcategory.id\n" +
          "WHERE product.slug ILIKE ?1")
  Optional<Product> findProductBySlug(String slug);

  Optional<Product> findByName(String name);

  Page<Product> findByCategoryId(int categoryId, Pageable pageable);

  Page<Product> findBySubcategoryId(int categoryId, Pageable pageable);

  @Modifying
  @Query(nativeQuery = true, value = "UPDATE mydream.product SET status = 'Deleted' WHERE id = ?1 ")
  boolean deleteProduct(String id);

  @Query(nativeQuery = true, value = "SELECT product.*\n" +
          "FROM product  JOIN category on product.category = category.id\n" +
          "JOIN subcategory on product.subcategory = subcategory.id\n" +
          "WHERE CONCAT(product.name, category.name, subcategory.name) ILIKE ?1")
  List<Product> searchProduct(String keyword);

  @Query(nativeQuery = true, value = "SELECT id FROM product WHERE slug = ?1")
  boolean checkExistSlug(String slug);

}
