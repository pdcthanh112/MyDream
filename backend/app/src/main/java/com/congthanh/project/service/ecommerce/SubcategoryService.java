package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.SubcategoryDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.ecommerce.Subcategory;

public interface SubcategoryService {
    public ResponseWithTotalPage<SubcategoryDTO> getAllSubcategory(int pageNo, int pageSize);

    public Subcategory createSubcategory(SubcategoryDTO subcategoryDTO);
}
