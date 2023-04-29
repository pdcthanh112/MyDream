package com.congthanh.project.dto.ecommerce;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class CategoryDTO {

    private int id;
    private String name;
    private String enValue;
    private String viValue;
}
