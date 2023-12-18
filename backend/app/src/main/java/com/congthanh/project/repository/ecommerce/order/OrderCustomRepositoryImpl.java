package com.congthanh.project.repository.ecommerce.order;

import com.congthanh.project.entity.ecommerce.Order;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class OrderCustomRepositoryImpl implements OrderCustomRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<Order> findByStatus(String status, Pageable pageable) {
        String sql = status.equals("ALL") ? "SELECT o FROM Order o" : "SELECT o FROM Order o WHERE o.status = :status";
        TypedQuery<Order> query = entityManager.createQuery(sql, Order.class);
        if(!status.equals("ALL")) {
            query.setParameter("status", status);
        }
        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());
        return new PageImpl<>(query.getResultList(), pageable, query.getResultList().size());
    }
}

