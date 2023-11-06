package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.entity.ecommerce.Store;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface StoreRepository extends JpaRepository<Store, String> {

//    boolean createStore(Store store);
}
