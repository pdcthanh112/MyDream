package com.congthanh.project.repository.ecommerce.review;

import com.congthanh.project.model.ecommerce.request.RatingStarDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface ReviewCustomRepository {

    RatingStarDTO getReviewStatsFromProduct(String productId);
}
