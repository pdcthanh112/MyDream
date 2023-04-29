package com.congthanh.project.dto.ecommerce;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class CategoryDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private int id;
    private String name;
    private String enValue;
    private String viValue;
}
