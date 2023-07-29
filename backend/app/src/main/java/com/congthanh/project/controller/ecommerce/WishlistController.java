package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.constant.common.ResponseStatus;
import com.congthanh.project.dto.ecommerce.WishlistDTO;
import com.congthanh.project.dto.response.Response;
import com.congthanh.project.service.ecommerce.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/getByCustomer")
    public ResponseEntity<Response<WishlistDTO>> getWishlistByCustomer(@RequestParam String customerId) {
        WishlistDTO data = wishlistService.getWishlistByCustomer(customerId);
        Response<WishlistDTO> response = new Response();
        response.setData(data);
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        response.setMessage("Add successfully");
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Response<String>> removeProductFromWishlist(@RequestParam String customer, @RequestParam String productId) {
        boolean result = wishlistService.removeProductFromWishlist(customer, productId);
        if (result) {
            Response<String> response = new Response();
            response.setData(null);
            response.setStatus(ResponseStatus.STATUS_SUCCESS);
            response.setMessage("Delete successfully");
            return ResponseEntity.ok().body(response);
        } else {
            throw new RuntimeException("Product khong ton tai");
        }
    }
}
