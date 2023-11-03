package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.constant.common.ResponseStatus;
import com.congthanh.project.dto.ecommerce.CartDTO;
import com.congthanh.project.dto.response.Response;
import com.congthanh.project.entity.ecommerce.Cart;
import com.congthanh.project.repository.ecommerce.CartRepository;
import com.congthanh.project.service.ecommerce.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ecommerce/cart")
public class CartController {

  @Autowired
  private CartRepository cartRepository;

  @Autowired
  private CartService cartService;

  @GetMapping("/{id}")
  public ResponseEntity<Response<CartDTO>> getCartById(@PathVariable String id) {
    CartDTO result = cartService.getCartById(id);
    Response<CartDTO> response = new Response<>();
    response.setData(result);
    response.setStatus(ResponseStatus.STATUS_SUCCESS);
    response.setMessage("Get xong");
    return ResponseEntity.ok().body(response);
  }

  @GetMapping("/getByCustomer")
  public ResponseEntity<Response<List<CartDTO>>> getAllCartByCustomerId(@RequestParam String customerId) {
    List<CartDTO> result = cartService.getActiveCartByCustomerId(customerId);
    Response<List<CartDTO>> response = new Response<>();
    response.setData(result);
    response.setStatus(ResponseStatus.STATUS_SUCCESS);
    response.setMessage(result != null ? "Get xong" : "Cart emply");
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

  @DeleteMapping("/{id}")
  public ResponseEntity<Response<String>> deleteCart(@PathVariable String id) {
    Response<String> response = new Response<>();
    cartService.deleteCart((id));
    response.setData(null);
    response.setStatus(ResponseStatus.STATUS_SUCCESS);
    response.setMessage("Delete successfully");
    return ResponseEntity.ok().body(response);
  }

  @QueryMapping(value = "cart")
  List<Cart> carts() {
    return cartRepository.findAll();
  }
}
