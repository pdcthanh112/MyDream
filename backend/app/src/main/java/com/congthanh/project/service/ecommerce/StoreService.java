package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.ProductDTO;
import com.congthanh.project.dto.ecommerce.StoreDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.ecommerce.Store;

public interface StoreService {

    StoreDTO getStoreById(String id);
    Store createStore(StoreDTO storeDTO);

    ResponseWithTotalPage<ProductDTO> getProductFromStore(String storeId, Integer page, Integer limit);

}
