package com.congthanh.project.entity.ecommerce;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Set;

@Entity
@Data
@Table(name = "category")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String enValue;

    private String vnValue;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Set<Subcategory> subcategories;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Set<Goods> goods;
}
