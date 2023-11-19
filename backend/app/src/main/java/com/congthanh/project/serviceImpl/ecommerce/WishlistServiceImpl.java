package com.congthanh.project.serviceImpl.ecommerce;

import com.congthanh.project.dto.ecommerce.ProductDTO;
import com.congthanh.project.dto.ecommerce.WishlistDTO;
import com.congthanh.project.entity.ecommerce.Wishlist;
import com.congthanh.project.repository.ecommerce.wishlist.WishlistRepository;
import com.congthanh.project.service.ecommerce.WishlistService;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class WishlistServiceImpl implements WishlistService {

  @Autowired
  private WishlistRepository wishlistRepository;


  @Override
  public boolean addProductToWishlist(String customerId, String productId) {
    Tuple wishlist = wishlistRepository.checkExistWishlist(customerId);
    if (wishlist != null) {
      return wishlistRepository.addProductToWishlist(wishlist.get("customer", String.class), productId);
    } else {
      Wishlist createWishlist = Wishlist.builder()
              .customer(customerId)
              .build();
      Wishlist newWishlist = wishlistRepository.save(createWishlist);
      return wishlistRepository.addProductToWishlist(newWishlist.getCustomer(), productId);
    }
  }

  @Override
  public boolean removeProductFromWishlist(String customerId, String productId) {
    try {
      return wishlistRepository.removeProductFromWishlist(productId, customerId);
    } catch (Exception e) {
      throw new RuntimeException("fjalsf");
    }
  }

  @Override
  public WishlistDTO getWishlistByCustomer(String customerId) {
    WishlistDTO result = new WishlistDTO();
    List<Tuple> data = wishlistRepository.findWishlistByCustomer(customerId);
    result.setId(data.get(0).get("wishlistId", Long.class));
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
              .status(item.get("status", String.class))
              .slug(item.get("slug", String.class))
              .build();
      listProduct.add(productDTO);
    }
    result.setProduct(listProduct);
    return result;
  }
}
