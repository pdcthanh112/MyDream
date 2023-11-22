package com.congthanh.project.serviceImpl.ecommerce;

import com.congthanh.project.dto.ecommerce.CartDTO;
import com.congthanh.project.dto.ecommerce.CartItemDTO;
import com.congthanh.project.dto.ecommerce.CheckoutDTO;
import com.congthanh.project.entity.ecommerce.Cart;
import com.congthanh.project.entity.ecommerce.CartItem;
import com.congthanh.project.entity.ecommerce.Order;
import com.congthanh.project.model.ecommerce.mapper.CartMapper;
import com.congthanh.project.model.ecommerce.mapper.ProductMapper;
import com.congthanh.project.repository.ecommerce.cartItem.CartItemRepository;
import com.congthanh.project.repository.ecommerce.cart.CartRepository;
import com.congthanh.project.repository.ecommerce.order.OrderRepository;
import com.congthanh.project.service.ecommerce.OrderService;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartMapper cartMapper;

    @Autowired
    private ProductMapper productMapper;

    @Override
    public Order createOrder(CheckoutDTO checkoutDTO) {
        Order order = Order.builder()

                .build();
        return orderRepository.save(order);
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
                checkoutDTO.setTotal(checkout.get("total", Float.class));

                Cart cart = cartRepository.findById(checkout.get("cartId", String.class)).orElseThrow();

                CartDTO cartTmp = new CartDTO();
                cartTmp.setId(cart.getId());
                cartTmp.setName(cart.getName());
                cartTmp.setCustomerId(cart.getCustomerId());
                cartTmp.setStatus(cart.getStatus());
                cartTmp.setCreatedDate(cart.getCreatedDate());
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
