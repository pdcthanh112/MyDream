package com.congthanh.project.serviceImplement.ecommerce;

import com.congthanh.project.dto.ecommerce.ProductDTO;
import com.congthanh.project.dto.ecommerce.WishlistDTO;
import com.congthanh.project.entity.ecommerce.Wishlist;
import com.congthanh.project.repository.ecommerce.WishlistRepository;
import com.congthanh.project.service.ecommerce.WishlistService;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class WishlistServiceImplement implements WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Override
    public boolean addProductToWishlist(String customerId, String productId) {
        Tuple wishlist = wishlistRepository.checkExistWishlist(customerId);
        if (wishlist != null) {
            int result = wishlistRepository.addProductToWishlist(wishlist.get("id", Integer.class), productId);
            return result > 0;
        } else {
            Wishlist createWishlist = Wishlist.builder()
                    .customer(customerId)
                    .build();
            Wishlist newWishlist = wishlistRepository.save(createWishlist);
            int result = wishlistRepository.addProductToWishlist(newWishlist.getId(), productId);
            return result > 0;
        }
    }

    @Override
    public boolean removeProductToWishlist(String customerId, String productId) {
        return false;
    }

    @Override
    public WishlistDTO getWishlistByCustomer(String customerId) {
        WishlistDTO result = new WishlistDTO();
        List<Tuple> data = wishlistRepository.findWishlistByCustomer(customerId);
        System.out.println("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"+data);
        result.setId(data.get(0).get("wishlistId", Integer.class));
        result.setCustomer(data.get(0).get("customer", String.class));
        Set<ProductDTO> listProduct = new HashSet<>();
        for (Tuple item : data) {
            ProductDTO productDTO = ProductDTO.builder()
                    .id(item.get("productId", String.class))
                    .name(item.get("name", String.class))
                    .category(item.get("category", String.class))
                    .subcategory(item.get("subcategory", String.class))
                    .quantity(item.get("quantity", Integer.class))
                    .price(item.get("price", Float.class))
                    .sold(item.get("sold", Integer.class))
                    .production(item.get("production", String.class))
                    .image(item.get("image", String.class))
                    .description(item.get("description", String.class))
                    .ratingVote(item.get("ratingVote", Integer.class))
                    .ratingValue(item.get("ratingValue", Float.class))
                    .status(item.get("status", String.class))
                    .build();
            listProduct.add(productDTO);
        }
        result.setProduct(listProduct);
        return result;
    }
}