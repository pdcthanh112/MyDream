package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.CheckoutDTO;
import com.congthanh.project.entity.ecommerce.Order;
import com.congthanh.project.model.ecommerce.request.CreateOrderDTO;

import java.util.List;

public interface OrderService {

  Order createOrder(CreateOrderDTO createOrderDTO);

  List<CheckoutDTO> getHistoryByCustomer(String customerId);

}
