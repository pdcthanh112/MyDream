package com.congthanh.project.repository.ecommerce.address;

import com.congthanh.project.entity.ecommerce.Address;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface AddressCustomRepository {

    List<Address> getAddressByCustomerId(String customerId);
}
