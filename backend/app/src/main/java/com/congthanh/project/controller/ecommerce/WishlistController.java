package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.constant.common.ResponseStatus;
import com.congthanh.project.dto.response.Response;
import com.congthanh.project.service.ecommerce.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ecommerce/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @PostMapping("/add")
    public ResponseEntity<Response> getProductToWishlist(@RequestParam String customerId, @RequestParam String productId) {
        wishlistService.addProductToWishlist(customerId, productId);
        Response<String> response = new Response();
        response.setData(null);
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        response.setMessage("Add successfully");
        return ResponseEntity.ok().body(response);
    }
}
