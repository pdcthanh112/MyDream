package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.CheckoutDTO;
import com.congthanh.project.entity.ecommerce.Checkout;

import java.util.List;

public interface PurchasingService {

  CheckoutDTO checkoutCart(Checkout checkout);

  List<CheckoutDTO> getHistoryByCustomer(String customerId);

}
