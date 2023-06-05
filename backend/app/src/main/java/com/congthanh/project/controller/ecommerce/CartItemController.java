package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.constant.common.ResponseStatus;
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
    public ResponseEntity<Response<CartItem>> addToCart(@RequestParam String productId, @RequestParam int quantity, @RequestParam String cartId) {
        System.out.println(productId + "++++++++++++++++++++" + quantity + "+++++++++++++++++++++++++++++++++" + cartId);
        CartItem cartItem = cartItemService.addToCart(productId, quantity, cartId);
        Response<CartItem> response = new Response<>();
        response.setData(cartItem);
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        response.setMessage("Add to cart successfully");
        return ResponseEntity.ok().body(response);
    }
}
