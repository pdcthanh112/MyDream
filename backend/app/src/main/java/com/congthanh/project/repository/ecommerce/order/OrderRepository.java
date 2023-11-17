package com.congthanh.project.repository.ecommerce.order;

import com.congthanh.project.constant.common.StateStatus;
import com.congthanh.project.entity.ecommerce.Order;
import jakarta.persistence.Tuple;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface OrderRepository extends JpaRepository<Order, String>, OrderCustomRepository {

    @Query(nativeQuery = true, value = "SELECT checkout.id as checkoutId, cart.id as cartId, address, checkout_date, payment_method, total, phone, status, name\n" +
            "FROM Checkout JOIN Cart ON checkout.cart = cart.id\n" +
            "WHERE cart.customerid = ?1 AND status = '" + StateStatus.CHECKED_OUT + "' ORDER BY checkout_date DESC")
    List<Tuple> getHistoryByCustomer(String customerId);
}
