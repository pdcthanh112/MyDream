package com.congthanh.project.dto.ecommerce;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
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

    public BigDecimal getTotalOrderPrice() {
        BigDecimal sum = BigDecimal.ZERO;
        if (getCartItems() == null || getCartItems().isEmpty()) {
            return BigDecimal.ZERO;
        }
        Set<CartItemDTO> orderProducts = getCartItems();
        for (CartItemDTO item : orderProducts) {
            BigDecimal quantityDecimal = BigDecimal.valueOf(item.getQuantity());
            BigDecimal itemTotal = quantityDecimal.multiply(item.getProduct().getPrice());
            sum = sum.add(itemTotal);
        }
        return sum;
    }

    public int getCountItem() {
        if (this.cartItems == null || this.cartItems.isEmpty()) {
            return 0;
        }
        return this.cartItems.size();
    }

}
