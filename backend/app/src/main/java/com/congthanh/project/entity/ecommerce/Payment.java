package com.congthanh.project.entity.ecommerce;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "amount", precision = 19, scale = 4)
    private BigDecimal amount;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "payment_date")
    private Long paymentedDate;

    private String status;
}
