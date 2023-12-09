package com.congthanh.project.serviceImpl.ecommerce;

import com.congthanh.project.dto.ecommerce.CheckoutDTO;
import com.congthanh.project.entity.ecommerce.*;
import com.congthanh.project.exception.ecommerce.NotFoundException;
import com.congthanh.project.model.ecommerce.mapper.CheckoutMapper;
import com.congthanh.project.model.ecommerce.request.CreateCheckoutDTO;
import com.congthanh.project.model.ecommerce.request.CreateOrderDTO;
import com.congthanh.project.model.ecommerce.request.CreateOrderDetailDTO;
import com.congthanh.project.repository.ecommerce.cart.CartRepository;
import com.congthanh.project.repository.ecommerce.cartItem.CartItemRepository;
import com.congthanh.project.repository.ecommerce.checkout.CheckoutRepository;
import com.congthanh.project.repository.ecommerce.voucher.VoucherRepository;
import com.congthanh.project.service.ecommerce.CheckoutService;
import com.congthanh.project.service.ecommerce.OrderDetailService;
import com.congthanh.project.service.ecommerce.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderDetailService orderDetailService;

    @Autowired
    private CheckoutMapper checkoutMapper;

    @Override
    public CheckoutDTO getCheckoutById(int id) {
        Checkout result = checkoutRepository.findById(id).orElseThrow(() -> new NotFoundException("checkout not found"));
        return checkoutMapper.mapCheckoutEntityToDTO(result);
    }

    @Override
    public CheckoutDTO createCheckout(CreateCheckoutDTO createCheckoutDTO) {
        Cart cart = cartRepository.findById(createCheckoutDTO.getCartId()).orElseThrow(() -> new NotFoundException("cart not found"));
        Voucher voucher = voucherRepository.findById(createCheckoutDTO.getVoucher()).orElseThrow(() -> new NotFoundException("voucher not found"));

        Checkout checkout = Checkout.builder()
                .customer(createCheckoutDTO.getCustomer())
                .total(createCheckoutDTO.getTotal())
                .address(createCheckoutDTO.getAddress())
                .payment(createCheckoutDTO.getPayment())
                .checkoutDate(Instant.now().toEpochMilli())
                .phone(createCheckoutDTO.getPhone())
                .cart(cart)
                .voucher(voucher)
                .build();
        Checkout result = checkoutRepository.save(checkout);

        CreateOrderDTO createOrderDTO = CreateOrderDTO.builder()
                .customer(createCheckoutDTO.getCustomer())
                .total(cart.getTotalOrderPrice())
                .checkout(result.getId())
                .build();
        Order order = orderService.createOrder(createOrderDTO);

        List<CartItem> cartItemList = cartItemRepository.getAllCartItemByCartId(cart.getId());
        for (CartItem cartItem: cartItemList) {
            CreateOrderDetailDTO orderDetailDTO = CreateOrderDetailDTO.builder()
                    .productId(cartItem.getProduct().getId())
                    .quantity(cartItem.getQuantity())
                    .order(order)
                    .build();
            orderDetailService.createOrderDetail(orderDetailDTO);
        }

        cart.setStatus("CHECKED_OUT");
        cartRepository.save(cart);
        return checkoutMapper.mapCheckoutEntityToDTO(result);
    }
}
