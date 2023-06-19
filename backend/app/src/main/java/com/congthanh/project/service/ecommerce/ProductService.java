package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.ProductDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.ecommerce.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    Object getAllProduct(Integer page, Integer limit);

    ProductDTO getProductById(String id);

    Product createProduct(ProductDTO productDTO);

    Product updateProduct(ProductDTO productDTO);

    boolean deleteProduct(String id);

    ResponseWithTotalPage<ProductDTO> getProductByCategory(int categoryId, int page, int limit);

    ResponseWithTotalPage<ProductDTO> getProductBySubcategory(int subcategoryId, int page, int limit);

    List<ProductDTO> searchProduct(String keyword);
}
