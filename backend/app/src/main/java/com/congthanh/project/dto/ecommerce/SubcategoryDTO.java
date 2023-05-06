package com.congthanh.project.dto.ecommerce;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubcategoryDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private int id;
    private String name;
    private String enValue;
    private String viValue;
    private int category;

}