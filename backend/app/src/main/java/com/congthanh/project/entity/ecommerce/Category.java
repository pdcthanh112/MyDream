package com.congthanh.project.entity.ecommerce;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Nationalized;

import java.io.Serializable;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "category")
public class Category implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String enValue;

    @Nationalized
    private String viValue;

    private String status;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Set<Subcategory> subcategories;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Set<Goods> goods;
}
