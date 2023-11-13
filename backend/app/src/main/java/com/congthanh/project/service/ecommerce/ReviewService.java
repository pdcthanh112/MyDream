package com.congthanh.project.service.ecommerce;


import com.congthanh.project.dto.ecommerce.ReviewDTO;
import com.congthanh.project.dto.ecommerce.utils.RatingStarDTO;
import com.congthanh.project.entity.ecommerce.Review;

import java.util.List;

public interface ReviewService {

    Review createReview(ReviewDTO reviewDTO);

    RatingStarDTO getRatingStarOfProduct(String productId);

}
