package com.congthanh.project.repository.ecommerce.voucher;

import com.congthanh.project.entity.ecommerce.Voucher;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

public class VoucherCustomRepositoryImpl implements VoucherCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Voucher getVoucherByCode(String code) {
        String sql = "SELECT * FROM Voucher WHERE code = :code";
        TypedQuery<Voucher> query = entityManager.createQuery(sql, Voucher.class);
        query.setParameter("code", code);
        return query.getSingleResult();
    }
}
