package com.congthanh.project.repository.ecommerce.voucher;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class VoucherCustomRepositoryImpl implements VoucherCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;

}
