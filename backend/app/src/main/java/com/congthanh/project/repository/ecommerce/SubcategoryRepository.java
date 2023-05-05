package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.entity.ecommerce.Subcategory;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface SubcategoryRepository extends JpaRepository<Subcategory, Integer> {

    Optional<Subcategory> findSubcategoryById(int id);

    Optional<Subcategory> findSubcategoryByName(String name);
}
