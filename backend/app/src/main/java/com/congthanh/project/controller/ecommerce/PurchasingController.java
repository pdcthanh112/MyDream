package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.constant.common.ResponseStatus;
import com.congthanh.project.dto.ecommerce.CheckoutDTO;
import com.congthanh.project.dto.response.Response;
import com.congthanh.project.service.ecommerce.PurchasingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ecommerce/purchasing")
public class PurchasingController {

    @Autowired
    private PurchasingService purchasingService;

    @GetMapping("/history")
    public ResponseEntity<Response<List<CheckoutDTO>>> getHistoryByCustomer(@RequestParam String customerId) {
        List<CheckoutDTO> data = purchasingService.getHistoryByCustomer(customerId);
        Response<List<CheckoutDTO>> response = new Response<>();
        response.setData(data);
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        response.setMessage("Get all successfully");
        return ResponseEntity.ok().body(response);
    }
}
