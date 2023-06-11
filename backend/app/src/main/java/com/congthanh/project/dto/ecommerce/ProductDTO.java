package com.congthanh.project.dto.ecommerce;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO  {

    private String id;

    private String name;

    private String category;

    private String subcategory;

    private int quantity;

    private float price;

    private String production;

    private int sold;

    private String image;

    private String description;

    private RatingDTO rating;

    private String status;

}