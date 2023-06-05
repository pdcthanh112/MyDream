package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.CategoryDTO;
import com.congthanh.project.entity.ecommerce.Category;

public interface CategoryService {

    public Object getAllCategory(Integer pageNo, Integer pageSize);

    public Category createCategory(CategoryDTO categoryDTO);

    public Category updateCategory(CategoryDTO categoryDTO);

    public boolean deleteCategory(int id);
}
