package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.StoreDTO;
import com.congthanh.project.entity.ecommerce.Store;

public interface StoreService {

    Store createStore(StoreDTO storeDTO);

}
