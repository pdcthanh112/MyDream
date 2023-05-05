package com.congthanh.project.entity.ecommerce;

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
@Table(name = "goods")
public class Goods implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    private String enValue;

    @Column(columnDefinition = "nvarchar")
    private String vnValue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subcategory", nullable = false)
    private Subcategory subcategory;

    private int quantity;

    private float price;

    private int sold;

    private String image;

    private String status;

    @Column(columnDefinition = "text")
    private String description;
}
