package com.congthanh.project.entity.ecommerce;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Checkout {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String customer;

  private float total;

  private String address;

  private String phone;

  @Column(name = "payment_method")
  private String paymentMethod;

  @Column(name = "checkout_date")
  private long checkoutDate;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "cart", nullable = false, referencedColumnName = "id")
  @JsonManagedReference
  private Cart cart;

}
