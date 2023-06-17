package com.congthanh.project.service.ecommerce;

public interface WishlistService {

    public boolean addProductToWishlist(String customerId, String productId);

    public boolean removeProductToWishlist(String customerId, String productId);
}
