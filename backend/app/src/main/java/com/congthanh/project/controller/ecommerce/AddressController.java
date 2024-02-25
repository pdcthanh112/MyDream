package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.constant.common.ResponseStatus;
import com.congthanh.project.dto.ecommerce.AddressDTO;
import com.congthanh.project.model.ecommerce.response.Response;
import com.congthanh.project.service.ecommerce.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ecommerce/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping("/{id}")
    public ResponseEntity<Response<AddressDTO>> getAddressById(@PathVariable("id") Long addressId) {
        AddressDTO data = addressService.getAddressById(addressId);
        Response<AddressDTO> response = new Response<>();
        response.setData(data);
        response.setMessage("get successfully");
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/create")
    public ResponseEntity<Response<AddressDTO>> createAddress(@RequestBody AddressDTO addressDTO) {
        AddressDTO data = addressService.createAddress(addressDTO);
        Response<AddressDTO> response = new Response<>();
        response.setData(data);
        response.setMessage("Create successfully");
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Response<AddressDTO>> updateAddress(@PathVariable("id") Long addressId, @RequestBody AddressDTO addressDTO) {
        AddressDTO data = addressService.updateAddress(addressId, addressDTO);
        Response<AddressDTO> response = new Response<>();
        response.setData(data);
        response.setMessage("update successfully");
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response<String>> deleteAddress(@PathVariable("id") Long addressId) {
        addressService.deleteAddress(addressId);
        Response<String> response = new Response<>();
        response.setMessage("delete successfully");
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/getByCustomer")
    public ResponseEntity<Response<List<AddressDTO>>> getAddressByCustomer(@RequestParam("customer") String customerId) {
        List<AddressDTO> data = addressService.getAddressByCustomer(customerId);
        Response<List<AddressDTO>> response = new Response<>();
        response.setData(data);
        response.setMessage("get successfully");
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/getDefaultAddress")
    public ResponseEntity<Response<AddressDTO>> getDefaultAddressOfCustomer(@RequestParam("customer") String customerId) {
        AddressDTO data = addressService.getDefaultAddressOfCustomer(customerId);
        Response<AddressDTO> response = new Response<>();
        response.setData(data);
        response.setMessage("get successfully");
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        return ResponseEntity.ok().body(response);
    }
}
