package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.entity.ecommerce.Subcategory;
import jakarta.persistence.Tuple;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface SubcategoryRepository extends JpaRepository<Subcategory, Integer> {

  Optional<Subcategory> findById(int id);

  Optional<Subcategory> findByName(String name);

  @Query(nativeQuery = true, value = "SELECT id, name FROM subcategory WHERE category = ?1")
  List<Tuple> findByCategoryId(int id);

  @Modifying
  @Query(nativeQuery = true, value = "UPDATE mydream.Subcategory SET status = 'Deleted' WHERE id = ?1 ")
  boolean deleteSubcategory(int id);
}
