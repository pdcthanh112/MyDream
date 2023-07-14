package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.entity.ecommerce.Notification;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface NotificationRepository extends JpaRepository {

    @Query(nativeQuery = true, value = "SELECT * FROM ecommerce_notification WHERE customer = ?1")
    Notification getNotificationByCustomer(String customerId);

}
