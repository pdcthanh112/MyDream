package com.congthanh.project.entity.ecommerce;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
}
