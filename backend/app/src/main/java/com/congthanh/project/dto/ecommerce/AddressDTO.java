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
public class AddressDTO {

    private String id;

    @NotNull
    private String customer;

    private String country;

    private String addressLine1;

    private String addressLine2;

    private String addressLine3;

    private String street;

    private String postalCode;

}
