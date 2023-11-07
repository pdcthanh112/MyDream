package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.constant.common.ResponseStatus;
import com.congthanh.project.dto.ecommerce.StoreDTO;
import com.congthanh.project.dto.response.Response;
import com.congthanh.project.entity.ecommerce.Store;
import com.congthanh.project.service.ecommerce.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ecommerce/store")
public class StoreController {

    @Autowired
    private StoreService storeService;
    @PostMapping("/create")
    public ResponseEntity<Response<Store>> createStore(@RequestBody StoreDTO storeDTO) {
        Store store = storeService.createStore(storeDTO);
        Response<Store> response = new Response<>();
        response.setData(store);
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        response.setMessage("Created successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
