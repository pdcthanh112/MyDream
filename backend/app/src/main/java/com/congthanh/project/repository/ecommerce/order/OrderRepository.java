package com.congthanh.project.repository.ecommerce.order;

import com.congthanh.project.entity.ecommerce.Order;
import com.congthanh.project.enums.ecommerce.OrderStatus;
import jakarta.persistence.Tuple;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface OrderRepository extends JpaRepository<Order, String>, OrderCustomRepository {

    @Query(nativeQuery = true, value = "SELECT checkout.id as checkoutId, cart.id as cartId, address, checkout_date, payment_method, total, phone, status, name\n" +
            "FROM Checkout JOIN Cart ON checkout.cart = cart.id\n" +
            "WHERE cart.customerid = ?1 AND status = '" + "CHECKED_OUT" + "' ORDER BY checkout_date DESC")
    List<Tuple> getHistoryByCustomer(String customerId);
}
