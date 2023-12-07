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
@Table(name = "checkout")
public class Checkout {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String customer;

  @Column(precision = 38, scale = 4)
  private BigDecimal total;

  private String address;

  private String phone;

  @Column(name = "payment")
  private String payment;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "voucher")
  private Voucher voucher;

  @Column(name = "checkout_date")
  private long checkoutDate;

  @OneToOne(mappedBy = "checkout", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonBackReference
  @JsonIgnore
  private Cart cart;

  @OneToOne(mappedBy = "checkout", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonBackReference
  @JsonIgnore
  private Order order;

}
