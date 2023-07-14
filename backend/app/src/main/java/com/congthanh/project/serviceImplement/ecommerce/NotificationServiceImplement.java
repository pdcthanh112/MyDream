package com.congthanh.project.serviceImplement.ecommerce;

import com.congthanh.project.dto.ecommerce.NotificationDTO;
import com.congthanh.project.entity.ecommerce.Notification;
import com.congthanh.project.repository.ecommerce.NotificationRepository;
import com.congthanh.project.service.ecommerce.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImplement implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public List<NotificationDTO> getNotificationByCustomer(String customerId) {
        return null;
    }

    @Override
    public Notification createNotification(NotificationDTO notificationDTO) {
        return null;
    }
}
