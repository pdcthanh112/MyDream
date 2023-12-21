package com.congthanh.project.serviceImpl.ecommerce;

import com.congthanh.project.dto.ecommerce.*;
import com.congthanh.project.entity.ecommerce.*;
import com.congthanh.project.exception.ecommerce.NotFoundException;
import com.congthanh.project.model.ecommerce.mapper.CartMapper;
import com.congthanh.project.model.ecommerce.mapper.OrderMapper;
import com.congthanh.project.model.ecommerce.mapper.ProductMapper;
import com.congthanh.project.model.ecommerce.request.CreateOrderDTO;
import com.congthanh.project.model.ecommerce.response.ResponseWithPagination;
import com.congthanh.project.repository.ecommerce.cartItem.CartItemRepository;
import com.congthanh.project.repository.ecommerce.cart.CartRepository;
import com.congthanh.project.repository.ecommerce.checkout.CheckoutRepository;
import com.congthanh.project.repository.ecommerce.order.OrderRepository;
import com.congthanh.project.repository.ecommerce.voucher.VoucherRepository;
import com.congthanh.project.service.ecommerce.OrderService;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private CartMapper cartMapper;

    @Autowired
    private ProductMapper productMapper;

    @Override
    public Order createOrder(CreateOrderDTO createOrderDTO) {
        Checkout checkout = checkoutRepository.findById((int) createOrderDTO.getCheckout()).orElseThrow(() -> new NotFoundException("Checkout not found"));
        Voucher voucher = voucherRepository.findById(checkout.getVoucher().getId()).orElseThrow(() -> new NotFoundException("voucher not found"));
        BigDecimal orderTotal = createOrderDTO.getTotal();
        if(voucher != null) {
            if(voucher.getType().equals("PROMOTION")) {
                orderTotal = checkout.getTotal().subtract(BigDecimal.valueOf(voucher.getValue()));
            } else if (voucher.getType().equals("DISCOUNT")) {
                orderTotal = checkout.getTotal().multiply(BigDecimal.valueOf(voucher.getValue()/100));
            }
        }
        Order order = Order.builder()
                .customer(createOrderDTO.getCustomer())
                .orderDate(Instant.now().toEpochMilli())
                .checkout(checkout)
                .total(orderTotal)
                .status("NEW")
                .build();
        return orderRepository.save(order);
    }

    @Override
    public ResponseWithPagination<OrderDTO> getOrderByStatus(String status, int page, int limit) {
        PageRequest pageRequest = PageRequest.of(page, limit);
        Page<Order> data = orderRepository.findByStatus(status, pageRequest);
        if(data.hasContent()) {
            ResponseWithPagination<OrderDTO> response = new ResponseWithPagination<>();
            List<OrderDTO> list = new ArrayList<>();
            for(Order order: data) {
                OrderDTO orderDTO = orderMapper.mapOrderEntityToDTO(order);
                list.add(orderDTO);
            }
            response.setResponseList(list);
            response.setTotalPage(data.getTotalPages());
            return response;
        }
        return null;
    }

    @Override
    public List<CheckoutDTO> getHistoryByCustomer(String customerId) {

        List<CheckoutDTO> response = new ArrayList<>();
        List<Tuple> listCheckout = orderRepository.getHistoryByCustomer(customerId);
        if (listCheckout.size() > 0) {
            CheckoutDTO checkoutDTO = new CheckoutDTO();
            for (Tuple checkout : listCheckout) {
                checkoutDTO.setId(checkout.get("checkoutId", Long.class));
                checkoutDTO.setCheckoutDate(checkout.get("checkout_date", Long.class));
                checkoutDTO.setAddress(checkout.get("address", String.class));
                checkoutDTO.setPhone(checkout.get("phone", String.class));
                checkoutDTO.setPaymentMethod(checkout.get("payment_method", String.class));
                checkoutDTO.setTotal(checkout.get("total", BigDecimal.class));

                Cart cart = cartRepository.findById(checkout.get("cartId", String.class)).orElseThrow();

                CartDTO cartTmp = new CartDTO();
                cartTmp.setId(cart.getId());
                cartTmp.setName(cart.getName());
                cartTmp.setCustomer(cart.getCustomer());
                cartTmp.setStatus(cart.getStatus());
                cartTmp.setCreatedDate(cart.getCreatedAt());
                List<CartItem> listCartItem = cartItemRepository.getAllCartItemByCartId(cart.getId());
                if (listCartItem.size() > 0) {
                    Set<CartItemDTO> cartItems = new HashSet<>();
                    for (CartItem cartItemItem : listCartItem) {
                        CartItemDTO cartItemTmp = new CartItemDTO();
                        cartItemTmp.setId(cartItemItem.getId());
                        cartItemTmp.setQuantity(cartItemItem.getQuantity());
                        cartItemTmp.setCart(cartMapper.mapCartEntityToDTO(cart));
                        cartItemTmp.setProduct(productMapper.mapProductEntityToDTO(cartItemItem.getProduct()));
                        cartItems.add(cartItemTmp);
                    }
                    cartTmp.setCartItems(cartItems);
                }
                checkoutDTO.setCart(cartTmp);
                response.add(checkoutDTO);
            }
        } else {
            return null;
        }
        return response;
    }
}
