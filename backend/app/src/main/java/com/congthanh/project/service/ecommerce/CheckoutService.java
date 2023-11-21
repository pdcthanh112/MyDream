package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.CheckoutDTO;
import com.congthanh.project.entity.ecommerce.Checkout;
import com.congthanh.project.model.ecommerce.request.CreateCheckoutDTO;

public interface CheckoutService {


    CheckoutDTO getCheckoutById(int id);
    CheckoutDTO createCheckout(CreateCheckoutDTO createCheckoutDTO);

}
