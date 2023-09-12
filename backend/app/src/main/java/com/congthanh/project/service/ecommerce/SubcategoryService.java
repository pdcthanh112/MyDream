package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.SubcategoryDTO;
import com.congthanh.project.entity.ecommerce.Subcategory;

import java.util.List;

public interface SubcategoryService {

  Object getAllSubcategory(Integer pageNo, Integer pageSize);

  Subcategory createSubcategory(SubcategoryDTO subcategoryDTO);

  Subcategory updateSubcategory(SubcategoryDTO subcategoryDTO);

  boolean deleteSubcategory(int id);

  List<SubcategoryDTO> getSubcategoryByCategoryId(int id);
}
