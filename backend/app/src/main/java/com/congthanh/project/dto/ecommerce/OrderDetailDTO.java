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
public class OrderDetailDTO {

    private String id;

    private int quantity;

    @NotNull
    private String product;

    private float subtotal;

    private String createdAt;

    private String updatedAt;

}
