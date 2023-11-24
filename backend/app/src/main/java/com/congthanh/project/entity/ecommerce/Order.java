package com.congthanh.project.entity.ecommerce;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Orders")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  private String customer;

  @Column(columnDefinition = "text")
  private String note;

  @Column(name = "order_date")
  private Long orderDate;

  private String status;

  @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore
  private List<OrderDetail> orderDetail;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "checkout", nullable = false, referencedColumnName = "id")
  @JsonManagedReference
  private Checkout checkout;

}
