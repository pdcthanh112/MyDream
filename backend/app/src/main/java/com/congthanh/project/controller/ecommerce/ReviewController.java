package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.constant.common.ResponseStatus;
import com.congthanh.project.dto.ecommerce.ReviewDTO;
import com.congthanh.project.dto.ecommerce.utils.RatingStarDTO;
import com.congthanh.project.dto.response.Response;
import com.congthanh.project.entity.ecommerce.Review;
import com.congthanh.project.service.ecommerce.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ecommerce/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;
    @PostMapping("/create")
    public ResponseEntity<Response<Review>> createReview(@RequestBody ReviewDTO reviewDTO) {
        Review review = reviewService.createReview(reviewDTO);
        Response<Review> response = new Response<>();
        response.setData(review);
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        response.setMessage("Created successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/getRatingStar")
    public ResponseEntity<Response<RatingStarDTO>> getRatingStarOfProduct(@RequestParam("product") String productId) {
        RatingStarDTO rating = reviewService.getRatingStarOfProduct(productId);
        Response<RatingStarDTO> response = new Response<>();
        response.setData(rating);
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        response.setMessage("Get rating star successfully");
        return ResponseEntity.ok().body(response);
    }
}
