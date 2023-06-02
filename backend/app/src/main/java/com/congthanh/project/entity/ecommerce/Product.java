package com.congthanh.project.entity.ecommerce;

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
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    private int quantity;

    private float price;

    private String production;

    private int sold;

    private String image;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rating", referencedColumnName = "id", unique = true)
    private Rating rating;

    @Column(columnDefinition = "text")
    private String description;

    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subcategory", nullable = false)
    private Subcategory subcategory;

}
