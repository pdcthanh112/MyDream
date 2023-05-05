package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.dto.ecommerce.CategoryDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.ecommerce.Category;
import com.congthanh.project.service.ecommerce.CategoryService;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ecommerce/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/getAll")
    //@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    @PermitAll
    public ResponseEntity<List<CategoryDTO>> getAllCategory(@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        ResponseWithTotalPage<CategoryDTO> response = categoryService.getAllCategory(pageNo, pageSize);
        return ResponseEntity.ok().body((List<CategoryDTO>) response);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createCategory(@RequestBody CategoryDTO categoryDTO) {
        Category category = categoryService.createCategory(categoryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Created successfully");
    }


}
