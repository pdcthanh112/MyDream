package com.congthanh.project.serviceImpl.ecommerce;

import com.congthanh.project.dto.ecommerce.ProductDTO;
import com.congthanh.project.dto.ecommerce.StoreDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.ecommerce.Product;
import com.congthanh.project.entity.ecommerce.Store;
import com.congthanh.project.repository.ecommerce.store.StoreRepository;
import com.congthanh.project.service.ecommerce.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StoreServiceImpl implements StoreService {

    @Autowired
    private StoreRepository storeRepository;

    @Override
    public StoreDTO getStoreById(String id) {
        Store store = storeRepository.findById(id).orElseThrow(() -> new RuntimeException("Store not found"));
        StoreDTO response = StoreDTO.builder()
                .id(store.getId())
                .name(store.getName())
                .avatar(store.getAvatar())
                .background(store.getBackground())
                .domain(store.getDomain())
                .build();
        return response;
    }

    @Override
    public Store createStore(StoreDTO storeDTO) {
        Store store = Store.builder()
                .name(storeDTO.getName())
                .avatar(storeDTO.getAvatar())
                .background(storeDTO.getBackground())
                .domain(storeDTO.getDomain())
                .build();
        return storeRepository.save(store);
    }

    @Override
    public ResponseWithTotalPage<ProductDTO> getProductFromStore(String storeId, Integer page, Integer limit) {
        Pageable pageable = PageRequest.of(page, limit);
        Page<Product> result = storeRepository.getProductFromStore(storeId, pageable);
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
                        .production(product.getProduction())
                        .store(product.getStore().getId())
                        .image(product.getImage())
                        .description(product.getDescription())
                        .sold(product.getSold())
                        .slug(product.getSlug())
                        .build();
                list.add(productDTO);
            }
            response.setResponseList(list);
            response.setTotalPage(result.getTotalPages());
        } else {
            throw new RuntimeException("List empty exception");
        }
        return response;
    }

}
