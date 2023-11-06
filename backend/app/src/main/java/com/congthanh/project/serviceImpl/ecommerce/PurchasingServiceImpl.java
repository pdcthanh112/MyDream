package com.congthanh.project.serviceImpl.ecommerce;

import com.congthanh.project.dto.ecommerce.CartDTO;
import com.congthanh.project.dto.ecommerce.CartItemDTO;
import com.congthanh.project.dto.ecommerce.CheckoutDTO;
import com.congthanh.project.dto.ecommerce.ProductDTO;
import com.congthanh.project.entity.ecommerce.Cart;
import com.congthanh.project.entity.ecommerce.CartItem;
import com.congthanh.project.entity.ecommerce.Checkout;
import com.congthanh.project.repository.ecommerce.CartItemRepository;
import com.congthanh.project.repository.ecommerce.CartRepository;
import com.congthanh.project.repository.ecommerce.CheckoutRepository;
import com.congthanh.project.service.ecommerce.PurchasingService;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class PurchasingServiceImpl implements PurchasingService {

  @Autowired
  private CartRepository cartRepository;

  @Autowired
  private CartItemRepository cartItemRepository;

  @Autowired
  private CheckoutRepository checkoutRepository;

  @Override
  public CheckoutDTO checkoutCart(Checkout checkout) {
    return null;
  }

  @Override
  public List<CheckoutDTO> getHistoryByCustomer(String customerId) {

    List<CheckoutDTO> response = new ArrayList<>();
    List<Tuple> listCheckout = checkoutRepository.getHistoryByCustomer(customerId);
    if (listCheckout.size() > 0) {
      CheckoutDTO checkoutDTO = new CheckoutDTO();
      for (Tuple checkout : listCheckout) {
        checkoutDTO.setId(checkout.get("checkoutId", Integer.class));
        checkoutDTO.setCheckoutDate(checkout.get("checkout_date", Timestamp.class));
        checkoutDTO.setAddress(checkout.get("address", String.class));
        checkoutDTO.setPhone(checkout.get("phone", String.class));
        checkoutDTO.setPaymentMethod(checkout.get("payment_method", String.class));
        checkoutDTO.setTotal(checkout.get("total", Float.class));

        Cart cart = cartRepository.findById(checkout.get("cartId", String.class)).orElseThrow();

        CartDTO cartTmp = new CartDTO();
        cartTmp.setId(cart.getId());
        cartTmp.setName(cart.getName());
        cartTmp.setCustomerId(cart.getCustomerId());
        cartTmp.setStatus(cart.getStatus());
        cartTmp.setCreatedDate(cart.getCreatedDate());
        List<CartItem> listCartItem = cartItemRepository.getAllCartItemByCartId(cart.getId());
        if (listCartItem.size() > 0) {
          Set<CartItemDTO> cartItems = new HashSet<>();
          for (CartItem cartItemItem : listCartItem) {
            CartItemDTO cartItemTmp = new CartItemDTO();
            cartItemTmp.setId(cartItemItem.getId());
            cartItemTmp.setQuantity(cartItemItem.getQuantity());
            cartItemTmp.setCartId(cart.getId());
            cartItemTmp.setProduct(ProductDTO.builder()
                    .id(cartItemItem.getProduct().getId())
                    .name(cartItemItem.getProduct().getName())
                    .category(cartItemItem.getProduct().getCategory().getName())
                    .subcategory(cartItemItem.getProduct().getSubcategory().getName())
                    .quantity(cartItemItem.getProduct().getQuantity())
                    .price(cartItemItem.getProduct().getPrice())
                    .production(cartItemItem.getProduct().getProduction())
                    .sold(cartItemItem.getProduct().getSold())
                    .image(cartItemItem.getProduct().getImage())
                    .description(cartItemItem.getProduct().getDescription())
                    .ratingVote(cartItemItem.getProduct().getRatingVote())
                    .ratingValue(cartItemItem.getProduct().getRatingValue())
                    .status(cartItemItem.getProduct().getStatus())
                    .build());
            cartItems.add(cartItemTmp);
          }
          cartTmp.setCartItems(cartItems);
        }
        checkoutDTO.setCart(cartTmp);
        response.add(checkoutDTO);
      }
    } else {
      return null;
    }
    return response;
  }
}
