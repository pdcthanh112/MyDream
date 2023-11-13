package com.congthanh.project.dto.ecommerce.utils;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RatingStarDTO {

    @Min(0)
    private Long vote;

    @Min(0)
    private Double value;

}
