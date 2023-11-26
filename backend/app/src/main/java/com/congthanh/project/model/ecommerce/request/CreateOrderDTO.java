package com.congthanh.project.model.ecommerce.request;

import com.congthanh.project.entity.ecommerce.Checkout;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateOrderDTO {

    private Checkout checkout;

    private String customer;

    private String voucher;

    private String payment;

    private String note;

}
