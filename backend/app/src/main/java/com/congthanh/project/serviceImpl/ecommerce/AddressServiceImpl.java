package com.congthanh.project.serviceImpl.ecommerce;

import com.congthanh.project.dto.ecommerce.AddressDTO;
import com.congthanh.project.entity.ecommerce.Address;
import com.congthanh.project.exception.ecommerce.NotFoundException;
import com.congthanh.project.model.ecommerce.mapper.AddressMapper;
import com.congthanh.project.repository.ecommerce.address.AddressRepository;
import com.congthanh.project.service.ecommerce.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private AddressMapper addressMapper;

    @Override
    public AddressDTO getAddressById(String addressId) {
        Address result = addressRepository.findById(addressId).orElseThrow(() -> new NotFoundException("address not found"));
        return addressMapper.mapAddressEntityToDTO(result);
    }

    @Override
    public AddressDTO createAddress(AddressDTO addressDTO) {
        Address address = Address.builder()
                .customer(addressDTO.getCustomer())
                .phone(addressDTO.getPhone())
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

    @Override
    public AddressDTO updateAddress(String addressId, AddressDTO addressDTO) {
        Address exitsAddress = addressRepository.findById(addressId).orElseThrow(() -> new NotFoundException("address not found"));
        exitsAddress.setPhone(addressDTO.getPhone());
        exitsAddress.setCountry(addressDTO.getCountry());
        exitsAddress.setAddressLine1(addressDTO.getAddressLine1());
        exitsAddress.setAddressLine2(addressDTO.getAddressLine2());
        exitsAddress.setAddressLine3(addressDTO.getAddressLine3());
        exitsAddress.setStreet(addressDTO.getStreet());
        exitsAddress.setStreet(addressDTO.getStreet());
        exitsAddress.setPostalCode(addressDTO.getPostalCode());
        Address result = addressRepository.save(exitsAddress);
        return addressMapper.mapAddressEntityToDTO(result);
    }

    @Override
    public List<AddressDTO> getAddressByCustomer(String customerId) {
        List<Address> data = addressRepository.getAddressByCustomerId(customerId);
        if (!data.isEmpty()) {
            List<AddressDTO> result = new ArrayList<>();
            for (Address item : data) {
                AddressDTO address = addressMapper.mapAddressEntityToDTO(item);
                result.add(address);
            }
            return result;
        }
        return null;
    }
}
