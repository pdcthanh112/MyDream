package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.entity.ecommerce.Category;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface CategoryInterface extends JpaRepository<Category, Integer> {

}
