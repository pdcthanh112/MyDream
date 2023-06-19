package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.CategoryDTO;
import com.congthanh.project.entity.ecommerce.Category;

public interface CategoryService {

    Object getAllCategory(Integer pageNo, Integer pageSize);

    Category createCategory(CategoryDTO categoryDTO);

    Category updateCategory(CategoryDTO categoryDTO);

    boolean deleteCategory(int id);

}
