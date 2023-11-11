package com.congthanh.project.repository.ecommerce.review;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface ReviewCustomRepository {

    List<Object> getReviewStatsFromProduct(String productId);
}
