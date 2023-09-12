package com.congthanh.project.dto.ecommerce;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CheckoutDTO {

  private int id;

  private float total;

  private String address;

  private String phone;

  private String paymentMethod;

  private Timestamp checkoutDate;

  private CartDTO cart;

}
