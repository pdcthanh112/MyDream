package com.congthanh.project.entity.ecommerce;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Orders")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String customer;

  @Column(columnDefinition = "text")
  private String note;

  @Column(precision = 38, scale = 4)
  private BigDecimal total;

  @Column(name = "order_date")
  private Long orderDate;

  private String status;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "checkout", nullable = false, referencedColumnName = "id")
  @JsonManagedReference
  private Checkout checkout;

  @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore
  private List<OrderDetail> orderDetail;

}
