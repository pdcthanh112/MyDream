package com.congthanh.project.repository.ecommerce;

import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;

public class StoreCustomRepositoryImpl implements StoreCustomRepository {

    @Autowired
    private EntityManager entityManager;

//    @Override
//    @Transactional
//    public boolean addStore(Store store) {
//        try {
//            entityManager.persist(store);
//            return true;
//        } catch (Exception e) {
//            return false;
//        }
//    }
}
