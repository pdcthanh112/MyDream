package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.CheckoutDTO;
import com.congthanh.project.entity.ecommerce.Checkout;

public interface CheckoutService {

    CheckoutDTO checkoutCart(Checkout checkout);
}
