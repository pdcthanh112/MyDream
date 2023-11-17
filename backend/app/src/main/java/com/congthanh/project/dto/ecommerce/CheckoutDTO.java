package com.congthanh.project.dto.ecommerce;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CheckoutDTO {

  private int id;

  private String customer;

  private float total;

  private String address;

  private String phone;

  private String paymentMethod;

  private long checkoutDate;

  private CartDTO cart;

}
