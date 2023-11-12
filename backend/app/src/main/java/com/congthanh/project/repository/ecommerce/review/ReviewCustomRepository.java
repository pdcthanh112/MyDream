package com.congthanh.project.repository.ecommerce.review;

import com.congthanh.project.dto.ecommerce.utils.RatingStarDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface ReviewCustomRepository {

    RatingStarDTO getReviewStatsFromProduct(String productId);
}
