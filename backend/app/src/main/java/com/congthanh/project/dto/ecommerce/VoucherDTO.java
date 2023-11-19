package com.congthanh.project.dto.ecommerce;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VoucherDTO {

    private String id;

    private String code;

    private String type;

    private float value;

    private int usageLimit;

    private String description;

    private Date startDate;

    private Date endDate;

    private String status;

    private long createdDate;

    private long updatedDate;

}
