package com.congthanh.project.repository.ecommerce.address;

import com.congthanh.project.entity.ecommerce.Address;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface AddressRepository extends JpaRepository<Address, String>, AddressCustomRepository {
}
