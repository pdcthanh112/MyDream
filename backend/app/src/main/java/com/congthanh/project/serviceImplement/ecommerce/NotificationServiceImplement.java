package com.congthanh.project.serviceImplement.ecommerce;

import com.congthanh.project.dto.ecommerce.NotificationDTO;
import com.congthanh.project.entity.ecommerce.Notification;
import com.congthanh.project.repository.ecommerce.NotificationRepository;
import com.congthanh.project.service.ecommerce.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationServiceImplement implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public List<NotificationDTO> getNotificationByCustomer(String customerId) {
        List<Notification> data = notificationRepository.getNotificationByCustomer(customerId);
        if (data != null || data.size() > 0) {
            List<NotificationDTO> result = new ArrayList<>();
            for (Notification item : data) {
                NotificationDTO notificationDTO = NotificationDTO.builder()
                        .id(item.getId())
                        .customer(item.getCustomer())
                        .title(item.getTitle())
                        .content(item.getContent())
                        .createdDate(item.getCreatedDate())
                        .build();
                result.add(notificationDTO);
            }
            return result;
        }
        return null;
    }

    @Override
    public Notification createNotification(NotificationDTO notificationDTO) {
        Notification notification = Notification.builder()
                .customer(notificationDTO.getCustomer())
                .content(notificationDTO.getContent())
                .title(notificationDTO.getTitle())
                .createdDate(Timestamp.valueOf(LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"))))
                .build();
        Notification response = notificationRepository.save(notification);
        return response;
    }
}
