package com.congthanh.project.service.ecommerce;


import com.congthanh.project.dto.ecommerce.ReviewDTO;
import com.congthanh.project.model.ecommerce.request.RatingStarDTO;
import com.congthanh.project.entity.ecommerce.Review;

public interface ReviewService {

    Review createReview(ReviewDTO reviewDTO);

    RatingStarDTO getRatingStarOfProduct(String productId);

}
