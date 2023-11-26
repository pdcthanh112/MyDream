package com.congthanh.project.serviceImpl.ecommerce;

import com.congthanh.project.dto.ecommerce.AddressDTO;
import com.congthanh.project.entity.ecommerce.Address;
import com.congthanh.project.model.ecommerce.mapper.AddressMapper;
import com.congthanh.project.repository.ecommerce.address.AddressRepository;
import com.congthanh.project.service.ecommerce.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private AddressMapper addressMapper;

    @Override
    public AddressDTO createAddress(AddressDTO addressDTO) {
        Address address  = Address.builder()
                .customer(addressDTO.getCustomer())
                .country(addressDTO.getCountry())
                .addressLine1(addressDTO.getAddressLine1())
                .addressLine2(addressDTO.getAddressLine2())
                .addressLine3(addressDTO.getAddressLine3())
                .street(addressDTO.getStreet())
                .postalCode(addressDTO.getPostalCode())
                .build();
        Address result = addressRepository.save(address);
        return addressMapper.mapAddressEntityToDTO(result);
    }
}
