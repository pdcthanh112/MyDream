package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.constant.common.ResponseStatus;
import com.congthanh.project.dto.ecommerce.CartItemDTO;
import com.congthanh.project.dto.ecommerce.ProductDTO;
import com.congthanh.project.dto.response.Response;
import com.congthanh.project.entity.ecommerce.CartItem;
import com.congthanh.project.service.ecommerce.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ecommerce/cart-item")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @PostMapping("/addToCart")
    public ResponseEntity<Response<CartItemDTO>> addItemToCart(@RequestParam String productId, @RequestParam int quantity, @RequestParam String cartId) {
        CartItem cartItem = cartItemService.addToCart(productId, quantity, cartId);
        CartItemDTO result = CartItemDTO.builder()
                .id(cartItem.getId())
                .product(ProductDTO.builder()
                        .id(cartItem.getProduct().getId())
                        .name(cartItem.getProduct().getName())
                        .category(cartItem.getProduct().getCategory().getName())
                        .subcategory(cartItem.getProduct().getSubcategory().getName())
                        .quantity(cartItem.getProduct().getQuantity())
                        .price(cartItem.getProduct().getPrice())
                        .production(cartItem.getProduct().getProduction())
                        .sold(cartItem.getProduct().getSold())
                        .image(cartItem.getProduct().getImage())
                        .description(cartItem.getProduct().getDescription())
                        .ratingVote(cartItem.getProduct().getRatingVote())
                        .ratingValue(cartItem.getProduct().getRatingValue())
                        .status(cartItem.getProduct().getStatus())
                        .build())
                .quantity(cartItem.getQuantity())
                .cartId(cartItem.getCart().getId())
                .build();
        Response<CartItemDTO> response = new Response<>();
        response.setData(result);
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        response.setMessage("Add to cart successfully");
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/update")
    public ResponseEntity<Response<CartItemDTO>> updateCartItem(@RequestParam String cartItemId, @RequestParam int quantity) {
        CartItemDTO cartItem = cartItemService.updateCartItem(cartItemId, quantity);
        Response<CartItemDTO> response = new Response<>();
        response.setData(cartItem);
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        response.setMessage("Update successfully");
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Response<String>> deleteCartItem(@PathVariable String id) {
        boolean result = cartItemService.deleteCartItem(id);
        if (result) {
            Response<String> response = new Response<>();
            response.setData(null);
            response.setStatus(ResponseStatus.STATUS_SUCCESS);
            response.setMessage("Delete successfully");
            return ResponseEntity.ok().body(response);
        } else {
            throw new RuntimeException("Loi");
        }
    }
}
