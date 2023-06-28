package com.congthanh.project.serviceImplement.ecommerce;

import com.congthanh.project.dto.ecommerce.CheckoutDTO;
import com.congthanh.project.entity.ecommerce.Checkout;
import com.congthanh.project.repository.ecommerce.CheckoutRepository;
import com.congthanh.project.service.ecommerce.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CheckoutServiceImplement implements CheckoutService {

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Override
    public CheckoutDTO checkoutCart(Checkout checkout) {
        return null;
    }
}
