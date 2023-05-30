package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.dto.ecommerce.ProductDTO;
import com.congthanh.project.entity.ecommerce.Product;
import com.congthanh.project.service.ecommerce.ProductService;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ecommerce/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/getAll")
    @PermitAll
    public ResponseEntity<Object> getAllProduct(@RequestParam(required = false) Integer pageNo, @RequestParam(required = false) Integer pageSize) {
        Object response = productService.getAllProduct(pageNo, pageSize);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<ProductDTO> getProductById(@PathVariable("id") String id) {
        ProductDTO response = productService.getProductById(id);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/create")
    @PermitAll
    public ResponseEntity<String> createProduct(@RequestBody ProductDTO productDTO) {
        Product product = productService.createProduct(productDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Created successfully");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateProduct(@RequestBody ProductDTO productDTO) {
        Product product = productService.updateProduct(productDTO);
        return ResponseEntity.status(HttpStatus.OK).body("Update successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@RequestParam("id") String id) {
        boolean result = productService.deleteProduct(id);
        return ResponseEntity.status(HttpStatus.OK).body("Delete successfully");
    }
}
