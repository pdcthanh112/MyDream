package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.constant.common.StateStatus;
import com.congthanh.project.entity.ecommerce.Checkout;
import jakarta.persistence.Tuple;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface CheckoutRepository extends JpaRepository<Checkout, Integer> {

    @Query(nativeQuery = true, value = "SELECT checkout.id as checkoutId, cart.id as cartId, address, checkout_date, payment_method, total, phone, status, name\n" +
            "FROM Checkout JOIN Cart ON checkout.cart = cart.id\n" +
            "WHERE cart.customerid = 'b985c96b-5c07-4eac-ac63-db2d077a4f51' AND status = '" + StateStatus.CHECKED_OUT + "' ORDER BY checkout_date DESC")
    List<Tuple> getHistoryByCustomer(String customerId);
}
