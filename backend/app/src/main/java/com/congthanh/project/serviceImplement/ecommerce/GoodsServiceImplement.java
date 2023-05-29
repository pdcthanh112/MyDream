package com.congthanh.project.serviceImplement.ecommerce;

import com.congthanh.project.constant.common.Status;
import com.congthanh.project.dto.ecommerce.GoodsDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.ecommerce.Goods;
import com.congthanh.project.repository.ecommerce.GoodsRepository;
import com.congthanh.project.service.ecommerce.GoodsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GoodsServiceImplement implements GoodsService {

    @Autowired
    private GoodsRepository goodsRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Object getAllGoods(Integer pageNo, Integer pageSize) {
        if(pageNo != null & pageSize != null) {
            Pageable pageable = PageRequest.of(pageNo, pageSize);
            Page<Goods> pageResult = goodsRepository.findAll(pageable);
            ResponseWithTotalPage<GoodsDTO> result = new ResponseWithTotalPage<>();
            List<GoodsDTO> list = new ArrayList<>();
            if (pageResult.hasContent()) {
                for (Goods goods : pageResult.getContent()) {
                    GoodsDTO goodsDTO = modelMapper.map(goods, GoodsDTO.class);
                    list.add(goodsDTO);
                }
                result.setResponseList(list);
                result.setTotalPage(pageResult.getTotalPages());
            } else {
                throw new RuntimeException("List empty exception");
            }
            return result;
        }else {
            List<Goods> list = goodsRepository.findAll();
            List<GoodsDTO> result = new ArrayList<>();
            for (Goods item: list) {
                GoodsDTO goodsDTO = modelMapper.map(item, GoodsDTO.class);
                result.add(goodsDTO);
            }
            return result;
        }
    }

    @Override
    public GoodsDTO getGoodsById(String id) {
        Goods goods = goodsRepository.findById(id).orElseThrow(() -> new RuntimeException("Goods not found"));
        GoodsDTO result = modelMapper.map(goods, GoodsDTO.class);
        return result;
    }

    @Override
    public Goods createGoods(GoodsDTO goodsDTO) {
        Optional<Goods> existGoods = goodsRepository.findByName(goodsDTO.getName());
        if (existGoods.isPresent()) {
            throw new RuntimeException("Goods ton tai");
        } else {
            Goods goods = Goods.builder()
                    .name(goodsDTO.getName())
                    .category(goodsDTO.getCategory())
                    .subcategory(goodsDTO.getSubcategory())
                    .quantity(goodsDTO.getQuantity())
                    .price(goodsDTO.getPrice())
                    .production(goodsDTO.getProduction())
                    .sold(0)
                    .image(goodsDTO.getImage())
                    .description(goodsDTO.getDescription())
                    .status(Status.STATUS_ACTIVE)
                    .build();
            Goods response = goodsRepository.save(goods);
            return response;
        }
    }

    @Override
    public Goods updateGoods(GoodsDTO goodsDTO) {
        Goods goods = goodsRepository.findById(goodsDTO.getId()).orElseThrow(() -> new RuntimeException("Goods not found"));

        goods.setName(goodsDTO.getName());
        goods.setCategory(goodsDTO.getCategory());
        goods.setSubcategory(goodsDTO.getSubcategory());
        goods.setQuantity(goodsDTO.getQuantity());
        goods.setPrice(goodsDTO.getPrice());
        goods.setProduction(goodsDTO.getProduction());
        goods.setSold(goodsDTO.getSold());
        goods.setImage(goodsDTO.getImage());
        goods.setDescription(goodsDTO.getDescription());

        goodsRepository.save(goods);
        return goods;
    }

    @Override
    public boolean deleteGoods(String id) {
        Goods goods = goodsRepository.findById(id).orElseThrow(() -> new RuntimeException("Goods not found"));
        if (goods.getStatus().equalsIgnoreCase(Status.STATUS_DELETED)) {
            throw new RuntimeException("Goods have deleted before");
        } else {
            boolean result = goodsRepository.deleteGoods(id);
            return result;
        }
    }
}
