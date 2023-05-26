package com.congthanh.project.dto.ecommerce;

import com.congthanh.project.entity.ecommerce.Category;
import com.congthanh.project.entity.ecommerce.Subcategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoodsDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private String id;

    private String name;

    private int category;

    private int subcategory;

    private int quantity;

    private float price;

    private String production;

    private int sold;

    private String image;

    private String status;

    private String description;

}
