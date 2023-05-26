package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.GoodsDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.ecommerce.Goods;

public interface GoodsService {

    public ResponseWithTotalPage<GoodsDTO> getAllGoods(int pageNo, int pageSize);

    public Goods createGoods(GoodsDTO goodsDTO);

    public Goods updateGoods(GoodsDTO goodsDTO);

    public boolean deleteGoods(String id);
}