package com.congthanh.project.model.ecommerce.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCheckoutDTO {

    private String customer;

    private String cartId;

    private float total;

    private String address;

    private String phone;

    private String paymentMethod;

}
