package com.congthanh.project.entity.ecommerce;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "voucher")
public class Voucher {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String code;

    private String type;

    @Column(nullable = false)
    private float value;

    @Column(name = "usage_limit")
    private int usageLimit;

    @Column(columnDefinition = "text")
    private String description;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    private String status;

    @Column(name = "created_date")
    private long createdDate;

    @Column(name = "updated_date")
    private long updatedDate;

    @OneToMany(mappedBy = "voucher", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Checkout> checkout;

}
