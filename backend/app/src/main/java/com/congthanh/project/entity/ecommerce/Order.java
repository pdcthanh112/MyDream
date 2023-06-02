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
@Table(name = "Orders")
public class Order   {
  

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String voucher;
}
