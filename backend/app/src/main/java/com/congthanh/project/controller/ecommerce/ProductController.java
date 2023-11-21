package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.constant.common.ResponseStatus;
import com.congthanh.project.dto.ecommerce.ProductDTO;
import com.congthanh.project.model.ecommerce.response.Response;
import com.congthanh.project.model.ecommerce.response.ResponseWithTotalPage;
import com.congthanh.project.entity.ecommerce.Product;
import com.congthanh.project.repository.ecommerce.product.ProductRepository;
import com.congthanh.project.service.ecommerce.ProductService;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ecommerce/product")
public class ProductController {

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private ProductService productService;

  @GetMapping("/getAll")
  @PermitAll
  public ResponseEntity<Response<Object>> getAllProduct(@RequestParam(required = false) Integer page, @RequestParam(required = false) Integer limit) {
    Object data = productService.getAllProduct(page, limit);
    Response<Object> response = new Response<>();
    response.setData(data);
    response.setStatus(ResponseStatus.STATUS_SUCCESS);
    response.setMessage("Get all successfully");
    return ResponseEntity.ok().body(response);
  }

  @GetMapping("/getById/{id}")
  @PermitAll
  public ResponseEntity<Response<ProductDTO>> getProductById(@PathVariable("id") String id) {
    ProductDTO data = productService.getProductById(id);
    Response<ProductDTO> response = new Response<>();
    response.setData(data);
    response.setStatus(ResponseStatus.STATUS_SUCCESS);
    response.setMessage("Get by id successfully");
    return ResponseEntity.ok().body(response);
  }

  @GetMapping("/getBySlug/{slug}")
  @PermitAll
  public ResponseEntity<Response<ProductDTO>> getProductBySlug(@PathVariable("slug") String slug) {
    ProductDTO data = productService.getProductBySlug(slug);
    Response<ProductDTO> response = new Response<>();
    response.setData(data);
    response.setStatus(ResponseStatus.STATUS_SUCCESS);
    response.setMessage("Get by slug successfully");
    return ResponseEntity.ok().body(response);
  }

  @PostMapping("/create")
  @PermitAll
  public ResponseEntity<Response<ProductDTO>> createProduct(@RequestBody ProductDTO productDTO) {
    ProductDTO data = productService.createProduct(productDTO);
    Response<ProductDTO> response = new Response<>();
    response.setData(data);
    response.setStatus(ResponseStatus.STATUS_SUCCESS);
    response.setMessage("Created successfully");
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @PutMapping("/update")
  public ResponseEntity<String> updateProduct(@RequestBody ProductDTO productDTO) {
    Product product = productService.updateProduct(productDTO);
    return ResponseEntity.ok().body("Update successfully");
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<String> deleteProduct(@RequestParam("id") String id) {
    boolean result = productService.deleteProduct(id);
    return ResponseEntity.ok().body("Delete successfully");
  }

  @GetMapping("/getByCategory")
  public ResponseEntity<Response<ResponseWithTotalPage<ProductDTO>>> getProductByCategory(@RequestParam int categoryId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int limit) {
    ResponseWithTotalPage<ProductDTO> data = productService.getProductByCategory(categoryId, page, limit);
    Response<ResponseWithTotalPage<ProductDTO>> response = new Response<>();
    response.setData(data);
    response.setStatus(ResponseStatus.STATUS_SUCCESS);
    response.setMessage("Get successfully");
    return ResponseEntity.ok().body(response);
  }

  @GetMapping("/getBySubcategory")
  public ResponseEntity<Response<ResponseWithTotalPage<ProductDTO>>> getProductBySubcategory(@RequestParam int subcategory, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int limit) {
    ResponseWithTotalPage<ProductDTO> data = productService.getProductBySubcategory(subcategory, page, limit);
    Response<ResponseWithTotalPage<ProductDTO>> response = new Response<>();
    response.setData(data);
    response.setStatus(ResponseStatus.STATUS_SUCCESS);
    response.setMessage("Get successfully");
    return ResponseEntity.ok().body(response);
  }

  @GetMapping("/search")
  public ResponseEntity<Response<List<ProductDTO>>> searchProduct(@RequestParam String search) {
    List<ProductDTO> result = productService.searchProduct(search);
    Response<List<ProductDTO>> response = new Response<>();
    response.setData(result);
    response.setStatus(ResponseStatus.STATUS_SUCCESS);
    response.setMessage("Get successfully");
    return ResponseEntity.ok().body(response);
  }

  @QueryMapping(value = "product")
  List<Product> products() {
    return productRepository.findAll();
  }
}
