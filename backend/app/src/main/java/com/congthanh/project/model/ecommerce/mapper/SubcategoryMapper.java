package com.congthanh.project.model.ecommerce.mapper;

import com.congthanh.project.dto.ecommerce.CategoryDTO;
import com.congthanh.project.dto.ecommerce.SubcategoryDTO;
import jakarta.annotation.PostConstruct;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Subcategory {

    @Autowired
    private ModelMapper modelMapper;

    @PostConstruct
    private void configureModelMapper() {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        modelMapper.typeMap(com.congthanh.project.entity.ecommerce.Subcategory.class, SubcategoryDTO.class)
                .addMapping(src -> modelMapper.map(src.getCategory(), CategoryDTO.class), SubcategoryDTO::setCategory);
    }

    public Subcategory mapSubcategoryDTOToEntity(SubcategoryDTO subcategoryDTO) {
        return modelMapper.map(subcategoryDTO, Subcategory.class);
    }

    public SubcategoryDTO mapSubcategoryEntityToDTO(Subcategory subcategory) {
        return modelMapper.map(subcategory, SubcategoryDTO.class);
    }
}
