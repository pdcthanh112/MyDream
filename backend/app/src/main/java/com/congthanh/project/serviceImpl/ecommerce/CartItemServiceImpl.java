package com.congthanh.project.serviceImpl.ecommerce;

import com.congthanh.project.dto.ecommerce.CartItemDTO;
import com.congthanh.project.entity.ecommerce.Cart;
import com.congthanh.project.entity.ecommerce.CartItem;
import com.congthanh.project.entity.ecommerce.Product;
import com.congthanh.project.exception.ecommerce.NotFoundException;
import com.congthanh.project.model.ecommerce.mapper.CartItemMapper;
import com.congthanh.project.model.ecommerce.mapper.CartMapper;
import com.congthanh.project.model.ecommerce.mapper.ProductMapper;
import com.congthanh.project.repository.ecommerce.cartItem.CartItemRepository;
import com.congthanh.project.repository.ecommerce.cart.CartRepository;
import com.congthanh.project.repository.ecommerce.product.ProductRepository;
import com.congthanh.project.service.ecommerce.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class CartItemServiceImpl implements CartItemService {

  @Autowired
  private CartItemRepository cartItemRepository;

  @Autowired
  private CartRepository cartRepository;

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private CartItemMapper cartItemMapper;

  @Autowired
  private CartMapper cartMapper;

  @Autowired
  private ProductMapper productMapper;

  @Override
  public List<CartItemDTO> getItemByCartId(String cartId) {
    List<CartItem> data = cartItemRepository.getAllCartItemByCartId(cartId);
    List<CartItemDTO> result = new ArrayList<>();
    for (CartItem item: data) {
      CartItemDTO itemDTO = cartItemMapper.mapCartItemEntityToDTO(item);
      result.add(itemDTO);
    }
    return result;
  }

  @Override
  public CartItemDTO addToCart(String productId, int quantity, String cartId) {
    CartItem checkExistProduct = cartItemRepository.checkExistProductFromCart(cartId, productId);
    if (checkExistProduct == null) {
      Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new NotFoundException("cart not found"));
      Product product = productRepository.findById(productId).orElseThrow(() -> new NotFoundException("product not found"));
      CartItem cartItem = CartItem.builder()
              .product(product)
              .quantity(quantity)
              .cart(cart)
              .createdAt(new Date().getTime())
              .build();
      CartItem result =  cartItemRepository.save(cartItem);
      CartItemDTO response = cartItemMapper.mapCartItemEntityToDTO(result);
      return response;
    } else {
      checkExistProduct.setQuantity(checkExistProduct.getQuantity() + quantity);
      CartItem result = cartItemRepository.save(checkExistProduct);
      CartItemDTO response = cartItemMapper.mapCartItemEntityToDTO(result);
      return response;
    }
  }

  @Override
  public CartItemDTO updateCartItem(String cartItemId, int quantity) {
    CartItem cartItem = cartItemRepository.findById(cartItemId).orElseThrow();
    cartItem.setQuantity(quantity);
    CartItem result = cartItemRepository.save(cartItem);
    CartItemDTO response = CartItemDTO.builder()
            .id(result.getId())
            .quantity(result.getQuantity())
            .product(productMapper.mapProductEntityToDTO(result.getProduct()))
            .cart(cartMapper.mapCartEntityToDTO(result.getCart()))
            .build();
    return response;
  }

  @Override
  public boolean deleteCartItem(String cartItemId) {
    try {
      cartItemRepository.deleteById(cartItemId);
//            cartItemRepository.deleteCartItemById(cartItemId);
      return true;
    } catch (Exception e) {
      return false;
    }

  }
}
