package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.constant.common.ResponseStatus;
import com.congthanh.project.dto.ecommerce.CategoryDTO;
import com.congthanh.project.model.ecommerce.response.Response;
import com.congthanh.project.entity.ecommerce.Category;
import com.congthanh.project.repository.ecommerce.category.CategoryRepository;
import com.congthanh.project.service.ecommerce.CategoryService;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ecommerce/category")
public class CategoryController {

  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private CategoryService categoryService;

  @GetMapping("/getAll")
  //@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
  @PermitAll
  public ResponseEntity<Response<Object>> getAllCategory(@RequestParam(required = false) Integer page, @RequestParam(required = false) Integer limit) {
    Object data = categoryService.getAllCategory(page, limit);
    Response<Object> response = new Response<>();
    response.setData(data);
    response.setMessage("Get all successfully");
    response.setStatus(ResponseStatus.STATUS_SUCCESS);
    return ResponseEntity.ok().body(response);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Response<CategoryDTO>> getCategoryById(@PathVariable("id") int id) {
    CategoryDTO data = categoryService.getCategoryById(id);
    Response<CategoryDTO> response = new Response<>();
    response.setData(data);
    response.setMessage("Get by id successfully");
    response.setStatus(ResponseStatus.STATUS_SUCCESS);
    return ResponseEntity.ok().body(response);
  }

  @PostMapping("/create")
  @PermitAll
  public ResponseEntity<Response<CategoryDTO>> createCategory(@RequestBody CategoryDTO categoryDTO) {
    CategoryDTO data = categoryService.createCategory(categoryDTO);
    Response<CategoryDTO> response = new Response<>();
    response.setData(data);
    response.setMessage("Create successfully");
    response.setStatus(ResponseStatus.STATUS_SUCCESS);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @PutMapping("/update")
  public ResponseEntity<String> updateCategory(@RequestBody CategoryDTO categoryDTO) {
    Category category = categoryService.updateCategory(categoryDTO);
    return ResponseEntity.status(HttpStatus.OK).body("Update successfully");
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<String> deleteCategory(@RequestParam("id") int id) {
    boolean result = categoryService.deleteCategory(id);
    return ResponseEntity.status(HttpStatus.OK).body("Delete successfully");
  }

  @QueryMapping(value = "category")
  List<Category> categories() {
    return categoryRepository.findAll();
  }
}
