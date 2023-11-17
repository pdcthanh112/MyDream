package com.congthanh.project.serviceImpl.ecommerce;

import com.congthanh.project.constant.common.StateStatus;
import com.congthanh.project.dto.ecommerce.SubcategoryDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.ecommerce.Category;
import com.congthanh.project.entity.ecommerce.Subcategory;
import com.congthanh.project.exception.ecommerce.NotFoundException;
import com.congthanh.project.model.ecommerce.mapper.SubcategoryMapper;
import com.congthanh.project.repository.ecommerce.category.CategoryRepository;
import com.congthanh.project.repository.ecommerce.subcategory.SubcategoryRepository;
import com.congthanh.project.service.ecommerce.SubcategoryService;
import jakarta.persistence.Tuple;
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
public class SubcategoryServiceImpl implements SubcategoryService {

    @Autowired
    private SubcategoryRepository subcategoryRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private SubcategoryMapper subcategoryMapper;

    @Override
    public Object getAllSubcategory(Integer pageNo, Integer pageSize) {
        if (pageNo != null && pageSize != null) {
            Pageable pageable = PageRequest.of(pageNo, pageSize);
            Page<Subcategory> pageResult = subcategoryRepository.findAll(pageable);
            ResponseWithTotalPage<SubcategoryDTO> result = new ResponseWithTotalPage<>();
            List<SubcategoryDTO> list = new ArrayList<>();
            if (pageResult.hasContent()) {
                for (Subcategory subcategory : pageResult.getContent()) {
                    SubcategoryDTO subcategoryDTO = modelMapper.map(subcategory, SubcategoryDTO.class);
                    list.add(subcategoryDTO);
                }
                result.setResponseList(list);
                result.setTotalPage(pageResult.getTotalPages());
            } else {
                throw new RuntimeException("List empty exception");
            }
            return result;
        } else {
            List<Subcategory> list = subcategoryRepository.findAll();
            List<SubcategoryDTO> result = new ArrayList<>();
            for (Subcategory item : list) {
                SubcategoryDTO subcategoryDTO = modelMapper.map(item, SubcategoryDTO.class);
                result.add(subcategoryDTO);
            }
            return result;
        }
    }

    @Override
    public SubcategoryDTO getSubcategoryById(int id) {
        Subcategory subcategory = subcategoryRepository.findById(id).orElseThrow(() -> new NotFoundException("not found"));
        SubcategoryDTO result = subcategoryMapper.mapSubcategoryEntityToDTO(subcategory);
        return result;
    }

    @Override
    public Subcategory createSubcategory(String name, int categoryId) {
        boolean existSubcategory = subcategoryRepository.checkExistSubcategory(name, categoryId);
        if (existSubcategory) {
            throw new RuntimeException("Sub ton tai");
        }
        Optional<Category> category = categoryRepository.findById(categoryId);
        if (category.isEmpty()) {
            throw new NotFoundException("Category khong ton tai");
        } else {
            Subcategory subcategory = Subcategory.builder()
                    .name(name)
                    .category(category.get())
                    .status(StateStatus.STATUS_ACTIVE)
                    .build();
            Subcategory response = subcategoryRepository.save(subcategory);
            return response;
        }
    }

    @Override
    public Subcategory updateSubcategory(SubcategoryDTO subcategoryDTO) {
        Subcategory subcategory = subcategoryRepository.findById(subcategoryDTO.getId()).orElseThrow(() -> new RuntimeException("Subcategory not found"));

        subcategory.setName(subcategoryDTO.getName());
        //subcategory.setCategory(subcategoryDTO.getCategory());

        subcategoryRepository.save(subcategory);
        return subcategory;
    }

    @Override
    public boolean deleteSubcategory(int id) {
        Subcategory subcategory = subcategoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Subcategory not found"));
        if (subcategory.getStatus().equalsIgnoreCase(StateStatus.STATUS_DELETED)) {
            throw new RuntimeException("Category have deleted before");
        } else {
            boolean result = subcategoryRepository.deleteSubcategory(id);
            return result;
        }
    }

    @Override
    public List<SubcategoryDTO> getSubcategoryByCategoryId(int id) {
        List<Tuple> data = subcategoryRepository.findByCategoryId(id);
        List<SubcategoryDTO> result = new ArrayList<>();
        for (Tuple item : data) {
            SubcategoryDTO subcategoryDTO = SubcategoryDTO.builder()
                    .id(item.get("id", Integer.class))
                    .name(item.get("name", String.class))
                    .build();
            result.add(subcategoryDTO);
        }
        return result;
    }
}
