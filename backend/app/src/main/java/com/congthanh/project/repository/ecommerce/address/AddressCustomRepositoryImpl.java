package com.congthanh.project.repository.ecommerce.address;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class AddressCustomRepositoryImpl implements AddressCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;
}
