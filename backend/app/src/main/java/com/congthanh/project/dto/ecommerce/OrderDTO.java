package com.congthanh.project.dto.ecommerce;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {

    private String id;

    @NotNull
    private String customer;

    private String note;

    private BigDecimal total;

    private String orderDate;

    private CheckoutDTO checkout;

    @NotNull
    private String status;

}
