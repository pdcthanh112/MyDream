package com.congthanh.project.serviceImplement.ecommerce;

import com.congthanh.project.entity.ecommerce.Product;
import com.congthanh.project.entity.ecommerce.Wishlist;
import com.congthanh.project.repository.ecommerce.ProductRepository;
import com.congthanh.project.repository.ecommerce.WishlistRepository;
import com.congthanh.project.service.ecommerce.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class WishlistServiceImplement implements WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public boolean addProductToWishlist(String customerId, String productId) {
        Wishlist wishlist = wishlistRepository.findByCustomer(customerId);
        if (wishlist == null) {
            Wishlist newWishlist = Wishlist.builder()
                    .customer(customerId)
                    .build();
            wishlist = wishlistRepository.save(newWishlist);
        }
        List<Product> listProduct = wishlistRepository.findProductByCustomer(customerId);
        System.out.println("KKKKKKKKKKKKKKKKKKKKKKKKK"+ listProduct);
//        listProduct.add(productRepository.findById(productId).orElseThrow());
//        wishlistRepository.save(Wishlist.builder().customer(customerId).product((Set<Product>) listProduct).build());
        return true;
    }

    @Override
    public boolean removeProductToWishlist(String customerId, String productId) {
        return false;
    }
}
