package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.constant.common.ResponseStatus;
import com.congthanh.project.dto.ecommerce.SubcategoryDTO;
import com.congthanh.project.dto.response.Response;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.ecommerce.Subcategory;
import com.congthanh.project.service.ecommerce.SubcategoryService;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ecommerce/subcategory")
public class SubcategoryController {

    @Autowired
    private SubcategoryService subcategoryService;

    @GetMapping("getAll")
    //@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    @PermitAll
    public ResponseEntity<Response<Object>> getAllSubcategory(@RequestParam(required = false) Integer page, @RequestParam(required = false) Integer limit) {
        Object data = subcategoryService.getAllSubcategory(page, limit);
        Response<Object> response = new Response<>();
        response.setData(data);
        response.setMessage("Get all successfully");
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/create")
    public ResponseEntity<Response> createSubcategory(@RequestBody SubcategoryDTO subcategoryDTO) {
        Subcategory subcategory = subcategoryService.createSubcategory(subcategoryDTO);
        Response<Object> response = new Response<>();
        response.setData(subcategory);
        response.setMessage("Create successfully");
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
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
