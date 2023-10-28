package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.constant.common.ResponseStatus;
import com.congthanh.project.dto.ecommerce.NotificationDTO;
import com.congthanh.project.dto.response.Response;
import com.congthanh.project.entity.ecommerce.Notification;
import com.congthanh.project.service.ecommerce.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ecommerce/notification")
public class NotificationController {

  @Autowired
  private NotificationService notificationService;

  @GetMapping("/getByCustomer")
  public ResponseEntity<Response<List<NotificationDTO>>> getNotificationByCustomer(@RequestParam("id") String customerId) {
    List<NotificationDTO> result = notificationService.getNotificationByCustomer(customerId);
    Response<List<NotificationDTO>> response = new Response<>();
    response.setData(result);
    response.setStatus(ResponseStatus.STATUS_SUCCESS);
    response.setMessage(result != null ? "Get xong" : "Noti emply");
    return ResponseEntity.ok().body(response);
  }

  @PostMapping("/create")
  public ResponseEntity<Response<Notification>> createNotification(@RequestBody NotificationDTO notificationDTO) {
    Notification notification = notificationService.createNotification(notificationDTO);
    Response<Notification> response = new Response<>();
    response.setData(notification);
    response.setStatus(ResponseStatus.STATUS_SUCCESS);
    response.setMessage("Created successfully");
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }
}
