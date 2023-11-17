package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.CheckoutDTO;
import com.congthanh.project.entity.ecommerce.Checkout;

public interface CheckoutService {


    CheckoutDTO getCheckoutById(int id);
    Checkout createCheckout(CheckoutDTO checkoutDTO);

}
