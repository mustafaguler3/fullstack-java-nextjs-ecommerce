package com.example.my_app.notification.service;

import com.example.my_app.notification.dto.NotificationDTO;

public interface NotificationService {
    void sendEmail(NotificationDTO notificationDTO);
}
