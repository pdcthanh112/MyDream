package com.congthanh.project.entity.ecommerce;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "product")
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(nullable = false)
  private String name;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "category", nullable = false)
  private Category category;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "subcategory", nullable = false)
  private Subcategory subcategory;

  private int quantity;

  private float price;

  @Column(unique = true, name = "SKU")
  private String SKU;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "store", nullable = true)
  private Store store;

  private String production;

  private int sold;

  @Column(length = 1500)
  private String image;

  @Column(columnDefinition = "text")
  private String description;

  private String status;

  @Column(nullable = false, unique = true)
  private String slug;

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore
  private List<Review> review;

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  @JsonIgnore
  private Set<CartItem> cartItems;

  @ManyToMany(mappedBy = "product")
  @JsonIgnore
  @JsonBackReference
  private Set<Wishlist> wishlist;

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore
  private List<OrderDetail> orderDetail;

}
