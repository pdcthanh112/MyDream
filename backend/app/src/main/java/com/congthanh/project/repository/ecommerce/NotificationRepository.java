package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.entity.ecommerce.Notification;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM ecommerce_notification WHERE customer = ?1")
    List<Notification> getNotificationByCustomer(String customerId);

}
