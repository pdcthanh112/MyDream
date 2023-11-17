package com.congthanh.project.model.ecommerce.mapper;

import com.congthanh.project.dto.ecommerce.CartDTO;
import com.congthanh.project.entity.ecommerce.Cart;
import jakarta.annotation.PostConstruct;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CartMapper {

    @Autowired
    private ModelMapper modelMapper;

    @PostConstruct
    private void configureModelMapper() {

        // Thêm cấu hình ánh xạ cho các trường đặc biệt (ví dụ: Checkout)
//        modelMapper.typeMap(Cart.class, CartDTO.class)
//                .addMapping(src -> src.getCheckout().getId(), CartDTO::setCheckout);

        // Thêm các ánh xạ khác tùy thuộc vào yêu cầu của bạn
        // modelMapper.typeMap(Cart.class, CartDTO.class)
        //     .addMapping(src -> src.getYourProperty(), CartDTO::setYourProperty);

        // Hoặc sử dụng Converter nếu bạn cần xử lý logic phức tạp hơn
        // Converter<Cart, CartDTO> yourConverter = ctx -> {
        //     Cart source = ctx.getSource();
        //     CartDTO destination = ctx.getDestination();
        //     destination.setYourProperty(yourConversionLogic(source.getYourProperty()));
        //     return destination;
        // };
        // modelMapper.addConverter(yourConverter);
    }

    public Cart mapCartDTOToEntity(CartDTO cartDTO) {
        return modelMapper.map(cartDTO, Cart.class);
    }

    public CartDTO mapCartEntityToDTO(Cart cart) {
        return modelMapper.map(cart, CartDTO.class);
    }

}
