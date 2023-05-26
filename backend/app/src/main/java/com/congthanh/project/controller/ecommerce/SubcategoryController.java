package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.dto.ecommerce.SubcategoryDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.ecommerce.Subcategory;
import com.congthanh.project.service.ecommerce.SubcategoryService;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ecommerce/sub-category")
public class SubcategoryController {

    @Autowired
    private SubcategoryService subcategoryService;

    @GetMapping("getAll")
    //@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    @PermitAll
    public ResponseEntity<String> getAllCategory(@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        ResponseWithTotalPage response = subcategoryService.getAllSubcategory(pageNo, pageSize);
        return ResponseEntity.ok().body(response.toString());
    }

    @PostMapping("/create")
    public ResponseEntity<String> createSubcategory(@RequestBody SubcategoryDTO subcategoryDTO) {
        Subcategory subcategory = subcategoryService.createSubcategory(subcategoryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Created successfully");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateSubcategory(@RequestBody SubcategoryDTO subcategoryDTO) {
        Subcategory subcategory = subcategoryService.updateSubcategory(subcategoryDTO);
        return ResponseEntity.status(HttpStatus.OK).body("Update successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSubcategory(@RequestParam("id") int id) {
        boolean result = subcategoryService.deleteSubcategory(id);
        return ResponseEntity.status(HttpStatus.OK).body("Delete successfully");
    }
}
