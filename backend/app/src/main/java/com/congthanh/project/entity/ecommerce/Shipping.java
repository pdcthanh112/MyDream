package com.congthanh.project.entity.ecommerce;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "shipping")
public class Shipping {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

}
