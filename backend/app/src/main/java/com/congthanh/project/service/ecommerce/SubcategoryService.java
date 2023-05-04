package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.SubcategoryDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;

public interface SubcategoryService {
    public ResponseWithTotalPage<SubcategoryDTO> getAllSubcategory(int pageNo, int pageSize);
}
