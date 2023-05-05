package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.CategoryDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.ecommerce.Category;

public interface CategoryService {

    public ResponseWithTotalPage<CategoryDTO> getAllCategory(int pageNo, int pageSize);

    public Category createCategory(CategoryDTO categoryDTO);
}
