package com.congthanh.project.entity.ecommerce;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "product")
public class Product implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    private int category;

    private int subcategory;

    private int quantity;

    private float price;

    private String production;

    private int sold;

    private String image;

    @Column(columnDefinition = "text")
    private String description;

    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category", nullable = false, insertable = false, updatable = false)
    @JsonIgnore
    private Category categories;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subcategory", nullable = false, insertable = false, updatable = false)
    @JsonIgnore
    private Subcategory subcategories;

}
