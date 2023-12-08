package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.CheckoutDTO;
import com.congthanh.project.dto.ecommerce.OrderDTO;
import com.congthanh.project.entity.ecommerce.Order;
import com.congthanh.project.model.ecommerce.request.CreateOrderDTO;
import com.congthanh.project.model.ecommerce.response.ResponseWithPagination;

import java.util.List;

public interface OrderService {

  Order createOrder(CreateOrderDTO createOrderDTO);

  ResponseWithPagination<OrderDTO> getOrderByStatus(String status, int page, int limit);

  List<CheckoutDTO> getHistoryByCustomer(String customerId);

}
