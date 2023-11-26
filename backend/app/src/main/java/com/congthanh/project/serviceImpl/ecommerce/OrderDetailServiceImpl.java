package com.congthanh.project.serviceImpl.ecommerce;

import com.congthanh.project.dto.ecommerce.OrderDetailDTO;
import com.congthanh.project.entity.ecommerce.OrderDetail;
import com.congthanh.project.entity.ecommerce.Product;
import com.congthanh.project.exception.ecommerce.NotFoundException;
import com.congthanh.project.model.ecommerce.mapper.OrderDetailMapper;
import com.congthanh.project.model.ecommerce.request.CreateOrderDetailDTO;
import com.congthanh.project.repository.ecommerce.orderDetail.OrderDetailRepository;
import com.congthanh.project.repository.ecommerce.product.ProductRepository;
import com.congthanh.project.service.ecommerce.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderDetailMapper orderDetailMapper;

    @Override
    public OrderDetailDTO createOrderDetail(CreateOrderDetailDTO createOrderDetailDTO) {
        Product product = productRepository.findById(createOrderDetailDTO.getProductId()).orElseThrow(() -> new NotFoundException("Product not found"));
        OrderDetail orderDetail = OrderDetail.builder()
                .product(product)
                .quantity(createOrderDetailDTO.getQuantity())
                .orders(createOrderDetailDTO.getOrder())
                .status("NEW")
                .build();
        OrderDetail result = orderDetailRepository.save(orderDetail);
        return orderDetailMapper.mapOrderDetailEntityToDTO(result);
    }
}
