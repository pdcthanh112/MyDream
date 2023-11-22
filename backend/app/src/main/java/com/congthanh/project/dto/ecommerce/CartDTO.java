package com.congthanh.project.dto.ecommerce;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartDTO {

    private String id;

    private String name;

    private String customerId;

    private long createdDate;

    private String status;

    private Set<CartItemDTO> cartItems;

    private CheckoutDTO checkout;

    public Double getTotalOrderPrice() {
        double sum = 0D;
        Set<CartItemDTO> orderProducts = getCartItems();
        for (CartItemDTO item : orderProducts) {
            sum += item.getQuantity() * item.getProduct().getPrice();
        }
        return sum;
    }

    public int getCountItem() {
        return this.cartItems.size();
    }

}
