package com.congthanh.project.repository.ecommerce.cart;

import com.congthanh.project.entity.ecommerce.Cart;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface CartCustomRepository {

    Cart getDefaultOfCustomer(String customerId);

    boolean setDefaultCartForCustomer(String customerId, String cartId);
}
