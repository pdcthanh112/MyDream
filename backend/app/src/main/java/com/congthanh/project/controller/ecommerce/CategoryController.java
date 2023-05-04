package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.service.ecommerce.CategoryService;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/management/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("getAll")
    //@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    @PermitAll
    public ResponseEntity<String> getAllCategory(@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        ResponseWithTotalPage response = categoryService.getAllCategory(pageNo, pageSize);
        return ResponseEntity.ok().body(response.toString());
    }

}
