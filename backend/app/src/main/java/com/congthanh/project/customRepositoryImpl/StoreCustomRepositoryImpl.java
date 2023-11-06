package com.congthanh.project.customRepositoryImpl;

import com.congthanh.project.customRepository.StoreCustomRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;

public class StoreCustomRepositoryImpl implements StoreCustomRepository {

    @Autowired
    private EntityManager entityManager;

    @Override
    public boolean createStore() {
        return false;
    }
}
