package com.congthanh.project.entity.ecommerce;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "cart")
public class Cart {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  private String name;

  private String customerId;

  @Column(name = "created_date")
  private long createdDate;

  private String status;

  @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<CartItem> cartItems;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "checkout", referencedColumnName = "id")
  @JsonManagedReference
  private Checkout checkout;

  @Column(name = "is_default")
  @JsonProperty("isDefault")
  private boolean isDefault;

  @Transient
  public BigDecimal getTotalOrderPrice() {
    BigDecimal sum = BigDecimal.ZERO;
    if (this.cartItems == null || this.cartItems.isEmpty()) {
      return BigDecimal.ZERO;
    }
    Set<CartItem> orderProducts = this.cartItems;
    for (CartItem item : orderProducts) {
      BigDecimal quantityDecimal = BigDecimal.valueOf(item.getQuantity());
      BigDecimal itemTotal = quantityDecimal.multiply(item.getProduct().getPrice());
      sum = sum.add(itemTotal);
    }
    return sum;
  }

  public int getCountItem() {
    if (this.cartItems == null || this.cartItems.isEmpty()) {
      return 0;
    }
    return this.cartItems.size();
  }

}
