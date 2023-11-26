package com.congthanh.project.serviceImpl.ecommerce;

import com.congthanh.project.dto.ecommerce.CartDTO;
import com.congthanh.project.dto.ecommerce.CheckoutDTO;
import com.congthanh.project.entity.ecommerce.Cart;
import com.congthanh.project.entity.ecommerce.CartItem;
import com.congthanh.project.entity.ecommerce.Checkout;
import com.congthanh.project.entity.ecommerce.Order;
import com.congthanh.project.exception.ecommerce.NotFoundException;
import com.congthanh.project.model.ecommerce.mapper.CheckoutMapper;
import com.congthanh.project.model.ecommerce.request.CreateCheckoutDTO;
import com.congthanh.project.model.ecommerce.request.CreateOrderDTO;
import com.congthanh.project.model.ecommerce.request.CreateOrderDetailDTO;
import com.congthanh.project.repository.ecommerce.cart.CartRepository;
import com.congthanh.project.repository.ecommerce.checkout.CheckoutRepository;
import com.congthanh.project.repository.ecommerce.order.OrderRepository;
import com.congthanh.project.service.ecommerce.CheckoutService;
import com.congthanh.project.service.ecommerce.OrderDetailService;
import com.congthanh.project.service.ecommerce.OrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderDetailService orderDetailService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CheckoutMapper checkoutMapper;

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
    public CheckoutDTO createCheckout(CreateCheckoutDTO createCheckoutDTO) {
        Cart cart = cartRepository.findById(createCheckoutDTO.getCartId()).orElseThrow(() -> new NotFoundException("cart not found"));
        Checkout checkout = Checkout.builder()
                .customer(createCheckoutDTO.getCustomer())
                .total(createCheckoutDTO.getTotal())
                .address(createCheckoutDTO.getAddress())
                .paymentMethod(createCheckoutDTO.getPaymentMethod())
                .checkoutDate(new Date().getTime())
                .phone(createCheckoutDTO.getPhone())
                .cart(cart)
                .build();
        Checkout result = checkoutRepository.save(checkout);

        CreateOrderDTO createOrderDTO = CreateOrderDTO.builder()
                .checkout(result)
                .build();
        Order order = orderService.createOrder(createOrderDTO);
        for (CartItem cartItem: cart.getCartItems()) {
            CreateOrderDetailDTO orderDetailDTO = CreateOrderDetailDTO.builder()
                    .productId(cartItem.getProduct().getId())
                    .quantity(cartItem.getQuantity())
                    .order(order)
                    .build();
            orderDetailService.createOrderDetail(orderDetailDTO);
        }
        return checkoutMapper.mapCheckoutEntityToDTO(result);
    }
}
