package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.CheckoutDTO;
import com.congthanh.project.entity.ecommerce.Order;

import java.util.List;

public interface OrderService {


  Order createOrder(CheckoutDTO checkoutDTO);

  List<CheckoutDTO> getHistoryByCustomer(String customerId);

}
