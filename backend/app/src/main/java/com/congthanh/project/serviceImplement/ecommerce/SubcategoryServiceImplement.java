package com.congthanh.project.serviceImplement.ecommerce;

import com.congthanh.project.constant.common.Status;
import com.congthanh.project.dto.ecommerce.SubcategoryDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.ecommerce.Subcategory;
import com.congthanh.project.repository.ecommerce.SubcategoryRepository;
import com.congthanh.project.service.ecommerce.SubcategoryService;
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
public class SubcategoryServiceImplement implements SubcategoryService {

    @Autowired
    private SubcategoryRepository subcategoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Object getAllSubcategory(Integer pageNo, Integer pageSize) {
        if(pageNo != null && pageSize != null) {
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
            for (Subcategory item: list) {
                SubcategoryDTO subcategoryDTO = modelMapper.map(item, SubcategoryDTO.class);
                result.add(subcategoryDTO);
            }
            return result;
        }
    }

    @Override
    public Subcategory createSubcategory(SubcategoryDTO subcategoryDTO) {
        Optional<Subcategory> existSubcategory = subcategoryRepository.findByName(subcategoryDTO.getName());
        if (existSubcategory.isPresent()) {
            throw new RuntimeException("Sub ton tai");
        } else {
            Subcategory subcategory = Subcategory.builder()
                    .name(subcategoryDTO.getName())
                    .category(subcategoryDTO.getCategory())
                    .status(Status.STATUS_ACTIVE)
                    .build();
            Subcategory response = subcategoryRepository.save(subcategory);
            return response;
        }
    }

    @Override
    public Subcategory updateSubcategory(SubcategoryDTO subcategoryDTO) {
        Subcategory subcategory = subcategoryRepository.findById(subcategoryDTO.getId()).orElseThrow(() -> new RuntimeException("Subcategory not found"));

        subcategory.setName(subcategoryDTO.getName());
        subcategory.setCategory(subcategoryDTO.getCategory());

        subcategoryRepository.save(subcategory);
        return subcategory;
    }

    @Override
    public boolean deleteSubcategory(int id) {
        Subcategory subcategory = subcategoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Subcategory not found"));
        if (subcategory.getStatus().equalsIgnoreCase(Status.STATUS_DELETED)) {
            throw new RuntimeException("Category have deleted before");
        } else {
            boolean result = subcategoryRepository.deleteSubcategory(id);
            return result;
        }

    }
}
