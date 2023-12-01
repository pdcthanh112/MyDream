package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.AddressDTO;

import java.util.List;

public interface AddressService {

    AddressDTO getAddressById(String addressId);

    AddressDTO createAddress(AddressDTO addressDTO);

    AddressDTO updateAddress(String addressId, AddressDTO addressDTO);

    List<AddressDTO> getAddressByCustomer(String customerId);

    AddressDTO getDefaultAddressOfCustomer(String customerId);

    boolean setDefaultAddressForCustomer(String customerId, String addressId);

}
