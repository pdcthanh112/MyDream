package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.constant.common.ResponseStatus;
import com.congthanh.project.dto.ecommerce.CheckoutDTO;
import com.congthanh.project.model.ecommerce.request.CreateCheckoutDTO;
import com.congthanh.project.model.ecommerce.response.Response;
import com.congthanh.project.entity.ecommerce.Checkout;
import com.congthanh.project.service.ecommerce.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ecommerce/checkout")
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutService;

    @GetMapping("/{id}")
    public ResponseEntity<Response<CheckoutDTO>> getCheckoutById(@PathVariable("id") int checkoutId) {
        CheckoutDTO data = checkoutService.getCheckoutById(checkoutId);
        Response<CheckoutDTO> response = new Response<>();
        response.setData(data);
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        response.setMessage("Get checkout successfully");
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/create")
    public ResponseEntity<Response<CheckoutDTO>> createCheckout(@RequestBody CreateCheckoutDTO createCheckoutDTO) {
        CheckoutDTO checkout = checkoutService.createCheckout(createCheckoutDTO);
        Response<CheckoutDTO> response = new Response<>();
        response.setData(checkout);
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        response.setMessage("created successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }
}
