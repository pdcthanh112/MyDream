package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.ProductDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.ecommerce.Product;
import org.springframework.data.domain.Page;

public interface ProductService {

    public Object getAllProduct(Integer page, Integer limit);

    public ProductDTO getProductById(String id);

    public Product createProduct(ProductDTO productDTO);

    public Product updateProduct(ProductDTO productDTO);

    public boolean deleteProduct(String id);

    public ResponseWithTotalPage<ProductDTO> getProductByCategory(int categoryId, int page, int limit);

    public ResponseWithTotalPage<ProductDTO> getProductBySubcategory(int subcategoryId, int page, int limit);
}
