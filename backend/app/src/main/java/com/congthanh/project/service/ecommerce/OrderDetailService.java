package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.OrderDetailDTO;
import com.congthanh.project.model.ecommerce.request.CreateOrderDetailDTO;

public interface OrderDetailService {

    OrderDetailDTO createOrderDetail(CreateOrderDetailDTO createOrderDetailDTO);
}
