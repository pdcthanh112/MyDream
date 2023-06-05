package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.constant.common.ResponseStatus;
import com.congthanh.project.dto.ecommerce.CartDTO;
import com.congthanh.project.dto.response.Response;
import com.congthanh.project.entity.ecommerce.Cart;
import com.congthanh.project.service.ecommerce.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ecommerce/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/getAll/{id}")
    public ResponseEntity<Response<List<CartDTO>>> getAllCartByCustomerId(String customerId) {
        List<CartDTO> result = cartService.getAllActiveCartByCustomerId(customerId);
        Response<List<CartDTO>> response = new Response<>();
        response.setData(result);
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        response.setMessage("Get xong");
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/create")
    public ResponseEntity<Response<Cart>> createCart(@RequestBody CartDTO cartDTO) {
        Cart cart = cartService.createCart(cartDTO);
        Response<Cart> response = new Response<>();
        response.setData(cart);
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        response.setMessage("Created successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


}
