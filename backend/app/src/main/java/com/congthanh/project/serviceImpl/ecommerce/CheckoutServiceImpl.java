package com.congthanh.project.serviceImpl.ecommerce;

import com.congthanh.project.dto.ecommerce.CartDTO;
import com.congthanh.project.dto.ecommerce.CheckoutDTO;
import com.congthanh.project.entity.ecommerce.Cart;
import com.congthanh.project.entity.ecommerce.Checkout;
import com.congthanh.project.exception.ecommerce.NotFoundException;
import com.congthanh.project.repository.ecommerce.cart.CartRepository;
import com.congthanh.project.repository.ecommerce.checkout.CheckoutRepository;
import com.congthanh.project.service.ecommerce.CheckoutService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CheckoutDTO getCheckoutById(int id) {
        Checkout checkout = checkoutRepository.findById(id).orElseThrow(() -> new NotFoundException("checkout not found"));
        CheckoutDTO response = CheckoutDTO.builder()
                .id(checkout.getId())
                .customer(checkout.getCustomer())
                .total(checkout.getTotal())
                .address(checkout.getAddress())
                .phone(checkout.getPhone())
                .paymentMethod(checkout.getPaymentMethod())
                .checkoutDate(checkout.getCheckoutDate())
                .cart(modelMapper.map(checkout.getCart(), CartDTO.class))
                .build();
        return response;
    }

    @Override
    public Checkout createCheckout(CheckoutDTO checkoutDTO) {
        Cart cart = cartRepository.findById(checkoutDTO.getCart().getId()).orElseThrow(() -> new NotFoundException("cart not found"));
        Checkout checkout = Checkout.builder()
                .customer(checkoutDTO.getCustomer())
                .total(checkoutDTO.getTotal())
                .address(checkoutDTO.getAddress())
                .paymentMethod(checkoutDTO.getPaymentMethod())
                .checkoutDate(new Date().getTime())
                .phone(checkoutDTO.getPhone())
                .cart(cart)
                .build();
        return checkoutRepository.save(checkout);
    }
}
