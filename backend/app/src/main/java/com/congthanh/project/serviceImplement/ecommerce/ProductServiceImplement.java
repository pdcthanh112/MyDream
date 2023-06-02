package com.congthanh.project.serviceImplement.ecommerce;

import com.congthanh.project.constant.common.Status;
import com.congthanh.project.dto.ecommerce.ProductDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.ecommerce.Product;
import com.congthanh.project.repository.ecommerce.ProductRepository;
import com.congthanh.project.service.ecommerce.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImplement implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Object getAllProduct(Integer page, Integer limit) {
        if(page != null & limit != null) {
            Pageable pageable = PageRequest.of(page, limit);
            Page<Product> result = productRepository.findAll(pageable);
            ResponseWithTotalPage<ProductDTO> response = new ResponseWithTotalPage<>();
            if (result.hasContent()) {
                List<ProductDTO> list = new ArrayList<>();
                for (Product product : result.getContent()) {
                    ProductDTO productDTO = ProductDTO.builder()
                            .id(product.getId())
                            .name(product.getName())
                            .category(product.getCategory().getName())
                            .subcategory(product.getSubcategory().getName())
                            .quantity(product.getQuantity())
                            .price(product.getPrice())
                            .ratingVote(product.getRating() != null ? product.getRating().getVote() : 0)
                            .ratingValue(product.getRating() != null ? product.getRating().getValue() : 0)
                            .production(product.getProduction())
                            .image(product.getImage())
                            .description(product.getDescription())
                            .sold(product.getSold())
                            .build();
                    list.add(productDTO);
                }
                response.setResponseList(list);
                response.setTotalPage(result.getTotalPages());
            } else {
                throw new RuntimeException("List empty exception");
            }
            return response;
        }else {
            List<Product> list = productRepository.findAll();
            List<ProductDTO> result = new ArrayList<>();
            for (Product product: list) {
                ProductDTO productDTO = ProductDTO.builder()
                        .id(product.getId())
                        .name(product.getName())
                        .category(product.getCategory().getName())
                        .subcategory(product.getSubcategory().getName())
                        .quantity(product.getQuantity())
                        .price(product.getPrice())
                        .ratingVote(product.getRating() != null ? product.getRating().getVote() : 0)
                        .ratingValue(product.getRating() != null ? product.getRating().getValue() : 0)
                        .production(product.getProduction())
                        .image(product.getImage())
                        .description(product.getDescription())
                        .sold(product.getSold())
                        .build();
                result.add(productDTO);
            }
            return result;
        }
    }

    @Override
    public ProductDTO getProductById(String id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        ProductDTO result = modelMapper.map(product, ProductDTO.class);
        return result;
    }

    @Override
    public Product createProduct(ProductDTO productDTO) {
        Optional<Product> existProduct = productRepository.findByName(productDTO.getName());
        if (existProduct.isPresent()) {
            throw new RuntimeException("Product ton tai");
        } else {
            Product product = Product.builder()
                    .name(productDTO.getName())
                    //.category(productDTO.getCategory())
                    //.subcategory(productDTO.getSubcategory())
                    .quantity(productDTO.getQuantity())
                    .price(productDTO.getPrice())
                    .production(productDTO.getProduction())
                    .sold(0)
                    .image(productDTO.getImage())
                    .description(productDTO.getDescription())
                    .status(Status.STATUS_ACTIVE)
                    .build();
            Product response = productRepository.save(product);
            return response;
        }
    }

    @Override
    public Product updateProduct(ProductDTO productDTO) {
        Product product = productRepository.findById(productDTO.getId()).orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(productDTO.getName());
       // product.setCategory(productDTO.getCategory());
       // product.setSubcategory(productDTO.getSubcategory());
        product.setQuantity(productDTO.getQuantity());
        product.setPrice(productDTO.getPrice());
        product.setProduction(productDTO.getProduction());
        product.setSold(productDTO.getSold());
        product.setImage(productDTO.getImage());
        product.setDescription(productDTO.getDescription());

        productRepository.save(product);
        return product;
    }

    @Override
    public boolean deleteProduct(String id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        if (product.getStatus().equalsIgnoreCase(Status.STATUS_DELETED)) {
            throw new RuntimeException("Product have deleted before");
        } else {
            boolean result = productRepository.deleteProduct(id);
            return result;
        }
    }
}
