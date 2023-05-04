package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.CategoryDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;

public interface CategoryService {
    public ResponseWithTotalPage<CategoryDTO> getAllCategory(int pageNo, int pageSize);
}
