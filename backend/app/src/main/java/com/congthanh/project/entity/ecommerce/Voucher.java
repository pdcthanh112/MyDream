package com.congthanh.project.entity.ecommerce;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

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

    private String code;

    private String type;

    private float value;

    private int usageLimit;

    @Column(columnDefinition = "text")
    private String description;

    private Date startDate;

    private Date endDate;

    private String status;

    private long createdDate;

    private long updatedDate;

}
