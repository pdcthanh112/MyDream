package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.entity.ecommerce.Category;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface CategoryInterface extends JpaRepository<Category, Integer> {

    Optional<Category> findById(int id);
}
