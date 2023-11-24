package com.congthanh.project.entity.ecommerce;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Checkout {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String customer;

  @Column(name = "total", precision = 19, scale = 4)
  private BigDecimal total;

  private String address;

  private String phone;

  @Column(name = "payment_method")
  private String paymentMethod;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "voucher")
  private Voucher voucher;

  @Column(name = "checkout_date")
  private long checkoutDate;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "cart", nullable = false, referencedColumnName = "id")
  @JsonManagedReference
  private Cart cart;

  @OneToOne(mappedBy = "checkout", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonBackReference
  @JsonIgnore
  private Order order;

}
