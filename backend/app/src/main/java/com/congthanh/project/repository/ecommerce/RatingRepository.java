package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.entity.ecommerce.Rating;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface RatingRepository extends JpaRepository<Rating, Integer> {
    Optional<Rating> findById(int id);
}
