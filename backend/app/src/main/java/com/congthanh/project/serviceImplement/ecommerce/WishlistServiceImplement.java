package com.congthanh.project.serviceImplement.ecommerce;

import com.congthanh.project.entity.ecommerce.Product;
import com.congthanh.project.entity.ecommerce.Wishlist;
import com.congthanh.project.repository.ecommerce.ProductRepository;
import com.congthanh.project.repository.ecommerce.WishlistRepository;
import com.congthanh.project.service.ecommerce.WishlistService;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
            int  result = wishlistRepository.addProductToWishlist(newWishlist.getId(), productId);
            return result > 0;
        }
    }

    @Override
    public boolean removeProductToWishlist(String customerId, String productId) {
        return false;
    }
}
