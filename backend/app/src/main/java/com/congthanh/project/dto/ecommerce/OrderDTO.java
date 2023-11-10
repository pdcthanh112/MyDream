package com.congthanh.project.dto.ecommerce;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {

    private String id;

    @NotNull
    private String customer;

    private String note;

    private String orderDate;

    @NotNull
    private String status;

}
