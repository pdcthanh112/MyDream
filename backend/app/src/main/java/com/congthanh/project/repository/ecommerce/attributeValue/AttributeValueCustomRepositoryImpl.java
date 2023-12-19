package com.congthanh.project.repository.ecommerce.attributeValue;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class AttributeValueCustomRepositoryImpl implements AttributeValueCustomRepository{

    @PersistenceContext
    private EntityManager entityManager;
}
