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
        String sql = "SELECT a FROM Address a WHERE a.customer = :customerId ORDER BY isDefault DESC NULLS LAST";
        TypedQuery<Address> query = entityManager.createQuery(sql, Address.class);
        query.setParameter("customerId", customerId);
        return query.getResultList();
    }

    @Override
    public Address getDefaultAddressOfCustomer(String customerId) {
        String sql = "SELECT a FROM Address a WHERE a.customer = :customerId AND a.isDefault = true";
        TypedQuery<Address> query = entityManager.createQuery(sql, Address.class);
        query.setParameter("customerId", customerId);
        return query.getSingleResult();
    }

    @Override
    public boolean setDefaultAddressForCustomer(String customerId, String addressId) {
        String resetDefault = "UPDATE Address SET isDefault = false WHERE customer = :customerId";
        TypedQuery<Address> query = entityManager.createQuery(resetDefault, Address.class);
        query.setParameter("customerId", customerId);
        query.executeUpdate();

        String updateSingleAddressSql = "UPDATE Address SET isDefault = true WHERE id = :addressId";
        TypedQuery<Address> updateSingleAddressQuery = entityManager.createQuery(updateSingleAddressSql, Address.class);
        updateSingleAddressQuery.setParameter("addressId", addressId);
        return updateSingleAddressQuery.executeUpdate() > 0;
    }
}
