package com.congthanh.project.repository.ecommerce.address;

import com.congthanh.project.entity.ecommerce.Address;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

import java.util.List;

public class AddressCustomRepositoryImpl implements AddressCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Address> getAddressByCustomerId(String customerId) {
        String sql = "SELECT a FROM Address a WHERE a.customer = :customerId";
        TypedQuery<Address> query = entityManager.createQuery(sql, Address.class);
        query.setParameter("customerId", customerId);
        return query.getResultList();
    }
}
