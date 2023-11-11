package com.congthanh.project.dto.ecommerce;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {

  private String id;

  @NotNull
  private String name;

  private String category;

  private String subcategory;

  @Min(value = 0)
  private int quantity;

  @Min(value = 0)
  private float price;

  private String production;

  private int sold;

  private String image;

  private String description;

  private String store;

  private int ratingVote;

  private float ratingValue;

  private String status;

  private String slug;

}
