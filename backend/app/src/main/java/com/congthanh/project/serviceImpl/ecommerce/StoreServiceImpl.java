package com.congthanh.project.serviceImpl.ecommerce;

import com.congthanh.project.dto.ecommerce.StoreDTO;
import com.congthanh.project.entity.ecommerce.Store;
import com.congthanh.project.repository.ecommerce.store.StoreRepository;
import com.congthanh.project.service.ecommerce.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoreServiceImpl implements StoreService {

    @Autowired
    private StoreRepository storeRepository;

    @Override
    public Store createStore(StoreDTO storeDTO) {
        Store store = Store.builder()
                .name(storeDTO.getName())
                .avatar(storeDTO.getAvatar())
                .background(storeDTO.getBackground())
                .build();
        return storeRepository.save(store);
    }
}
