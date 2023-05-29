package com.congthanh.project.serviceImplement.ecommerce;

import com.congthanh.project.constant.common.Status;
import com.congthanh.project.dto.ecommerce.CategoryDTO;
import com.congthanh.project.dto.ecommerce.GoodsDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.ecommerce.Category;
import com.congthanh.project.entity.ecommerce.Goods;
import com.congthanh.project.repository.ecommerce.CategoryRepository;
import com.congthanh.project.service.ecommerce.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImplement implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Object getAllCategory(Integer pageNo, Integer pageSize) {
        if(pageNo != null && pageSize != null) {
            Pageable pageable = PageRequest.of(pageNo, pageSize);
            Page<Category> pageResult = categoryRepository.findAll(pageable);
            ResponseWithTotalPage<CategoryDTO> result = new ResponseWithTotalPage<>();
            List<CategoryDTO> list = new ArrayList<>();
            if (pageResult.hasContent()) {
                for (Category category : pageResult.getContent()) {
                    CategoryDTO categoryDTO = modelMapper.map(category, CategoryDTO.class);
                    list.add(categoryDTO);
                }
                result.setResponseList(list);
                result.setTotalPage(pageResult.getTotalPages());
            } else {
                throw new RuntimeException("List empty exception");
            }
            return result;
        } else {
            List<Category> list = categoryRepository.findAll();
            List<CategoryDTO> result = new ArrayList<>();
            for (Category item: list) {
                CategoryDTO categoryDTO = modelMapper.map(item, CategoryDTO.class);
                result.add(categoryDTO);
            }
            return result;
        }
    }

    @Override
    public Category createCategory(CategoryDTO categoryDTO) {
        Optional<Category> existCategory = categoryRepository.findByName(categoryDTO.getName());
        if (existCategory.isPresent()) {
            throw new RuntimeException("Category ton tai");
        } else {
            Category category = Category.builder()
                    .name(categoryDTO.getName())
                    .status(Status.STATUS_ACTIVE)
                    .build();
            Category response = categoryRepository.save(category);
            return response;
        }
    }

    @Override
    public Category updateCategory(CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(categoryDTO.getId()).orElseThrow(() -> new RuntimeException("Category not found"));

        category.setName(categoryDTO.getName());

        categoryRepository.save(category);
        return category;
    }

    @Override
    public boolean deleteCategory(int id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
        if (category.getStatus().equalsIgnoreCase(Status.STATUS_DELETED)) {
            throw new RuntimeException("Category have deleted before");
        } else {
            boolean result = categoryRepository.deleteCategory(id);
            return result;
        }
    }
}
