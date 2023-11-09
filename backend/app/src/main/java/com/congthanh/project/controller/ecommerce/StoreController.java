package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.constant.common.ResponseStatus;
import com.congthanh.project.dto.ecommerce.ProductDTO;
import com.congthanh.project.dto.ecommerce.StoreDTO;
import com.congthanh.project.dto.response.Response;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
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

    @GetMapping("/getById/{id}")
    public ResponseEntity<Response<StoreDTO>> getStoreById(@PathVariable String id) {
        StoreDTO store = storeService.getStoreById(id);
        Response<StoreDTO> response = new Response<>();
        response.setData(store);
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        response.setMessage("get successfully");
        return ResponseEntity.ok().body(response);
    }
    @PostMapping("/create")
    public ResponseEntity<Response<Store>> createStore(@RequestBody StoreDTO storeDTO) {
        Store store = storeService.createStore(storeDTO);
        Response<Store> response = new Response<>();
        response.setData(store);
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        response.setMessage("Created successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/getProductFromStore")
    public ResponseEntity<Response<ResponseWithTotalPage<ProductDTO>>> getProductFromStore(@RequestParam("store") String storeId, @RequestParam(required = false) Integer page, @RequestParam(required = false) Integer limit) {
        ResponseWithTotalPage<ProductDTO> data = storeService.getProductFromStore(storeId, page, limit);
        Response<ResponseWithTotalPage<ProductDTO>> response = new Response<>();
        response.setData(data);
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        response.setMessage("Get successfully");
        return ResponseEntity.ok().body(response);
    }
}
