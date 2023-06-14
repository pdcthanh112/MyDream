package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.SubcategoryDTO;
import com.congthanh.project.entity.ecommerce.Subcategory;

import java.util.List;

public interface SubcategoryService {

    public Object getAllSubcategory(Integer pageNo, Integer pageSize);

    public Subcategory createSubcategory(SubcategoryDTO subcategoryDTO);

    public Subcategory updateSubcategory(SubcategoryDTO subcategoryDTO);

    public boolean deleteSubcategory(int id);

    public List<SubcategoryDTO> getSubcategoryByCategoryId(int id);
}
