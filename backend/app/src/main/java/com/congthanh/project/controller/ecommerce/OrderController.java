package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.constant.common.ResponseStatus;
import com.congthanh.project.dto.ecommerce.CheckoutDTO;
import com.congthanh.project.dto.ecommerce.OrderDTO;
import com.congthanh.project.model.ecommerce.response.Response;
import com.congthanh.project.model.ecommerce.response.ResponseWithPagination;
import com.congthanh.project.service.ecommerce.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ecommerce/order")
public class OrderController {

  @Autowired
  private OrderService orderService;

  @GetMapping("/getByStatus")
  public ResponseEntity<Response<ResponseWithPagination<OrderDTO>>> getOrderByStatus(@RequestParam("status") String status, @RequestParam("page") int page, @RequestParam("limit") int limit) {
    ResponseWithPagination<OrderDTO> data = orderService.getOrderByStatus(status, page, limit);
    Response<ResponseWithPagination<OrderDTO>> response = new Response<>();
    response.setData(data);
    response.setStatus(ResponseStatus.STATUS_SUCCESS);
    response.setMessage("Get all successfully");
    return ResponseEntity.ok().body(response);
  }

  @GetMapping("/history")
  public ResponseEntity<Response<List<CheckoutDTO>>> getHistoryByCustomer(@RequestParam String customerId) {
    List<CheckoutDTO> data = orderService.getHistoryByCustomer(customerId);
    Response<List<CheckoutDTO>> response = new Response<>();
    response.setData(data);
    response.setStatus(ResponseStatus.STATUS_SUCCESS);
    response.setMessage("Get all successfully");
    return ResponseEntity.ok().body(response);
  }
}
