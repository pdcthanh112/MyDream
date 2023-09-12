package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.constant.common.ResponseStatus;
import com.congthanh.project.dto.ecommerce.WishlistDTO;
import com.congthanh.project.dto.response.Response;
import com.congthanh.project.service.ecommerce.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/ecommerce/wishlist")
public class WishlistController {

  @Autowired
  private WishlistService wishlistService;

  @GetMapping("/getByCustomer")
  public ResponseEntity<Response<WishlistDTO>> getWishlistByCustomer(@RequestParam String customerId) {
    WishlistDTO data = wishlistService.getWishlistByCustomer(customerId);
    Response<WishlistDTO> response = new Response();
    response.setData(data);
    response.setStatus(ResponseStatus.STATUS_SUCCESS);
    response.setMessage("Add successfully");
    return ResponseEntity.ok().body(response);
  }

  @PostMapping("/add")
  public ResponseEntity<Response> addProductToWishlist(@RequestBody Map<String, String> requestData) {
    String customerId = requestData.get("customerId");
    String productId = requestData.get("productId");
    try {
      wishlistService.addProductToWishlist(customerId, productId);
      Response<String> response = new Response();
      response.setData(null);
      response.setStatus(ResponseStatus.STATUS_SUCCESS);
      response.setMessage("Add successfully");
      return ResponseEntity.ok().body(response);
    } catch (Exception e) {
      throw new RuntimeException("Product already exist");
    }
  }

  @DeleteMapping("/remove")
  public ResponseEntity<Response<String>> removeProductFromWishlist(@RequestBody Map<String, String> requestData) {
    String customerId = requestData.get("customerId");
    String productId = requestData.get("productId");
    boolean result = wishlistService.removeProductFromWishlist(customerId, productId);
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
