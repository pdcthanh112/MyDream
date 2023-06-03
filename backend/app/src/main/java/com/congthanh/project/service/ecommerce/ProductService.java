package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.ProductDTO;
import com.congthanh.project.entity.ecommerce.Product;

public interface ProductService {

    public Object getAllProduct(Integer page, Integer limit);

    public ProductDTO getProductById(String id);

    public Product createProduct(ProductDTO productDTO);

    public Product updateProduct(ProductDTO productDTO);

    public boolean deleteProduct(String id);
}
