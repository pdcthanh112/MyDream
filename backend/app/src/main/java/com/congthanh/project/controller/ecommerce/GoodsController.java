package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.dto.ecommerce.GoodsDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.ecommerce.Goods;
import com.congthanh.project.service.ecommerce.GoodsService;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ecommerce/goods")
public class GoodsController {

    @Autowired
    private GoodsService goodsService;


    @GetMapping("/getAll")
    @PermitAll
    public ResponseEntity<ResponseWithTotalPage<GoodsDTO>> getAllGoods(@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        ResponseWithTotalPage<GoodsDTO> response = goodsService.getAllGoods(pageNo, pageSize);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/create")
    @PermitAll
    public ResponseEntity<String> createGoods(@RequestBody GoodsDTO goodsDTO) {
        Goods goods = goodsService.createGoods(goodsDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Created successfully");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateGoods(@RequestBody GoodsDTO goodsDTO) {
        Goods goods = goodsService.updateGoods(goodsDTO);
        return ResponseEntity.status(HttpStatus.OK).body("Update successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteGoods(@RequestParam("id") String id) {
        boolean result = goodsService.deleteGoods(id);
        return ResponseEntity.status(HttpStatus.OK).body("Delete successfully");
    }
}
