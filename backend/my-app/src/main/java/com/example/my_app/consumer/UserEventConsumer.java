package com.example.my_app.consumer;

import com.example.my_app.enums.NotificationType;
import com.example.my_app.notification.dto.NotificationDTO;
import com.example.my_app.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserEventConsumer {

    private final NotificationService notificationService;

    @KafkaListener(
            topics = "user-registration-topic",
            groupId = "ecommerce-group",
            containerFactory = "kafkaListenerContainerFactory"
    )
    public void consumeUserRegistration(Map<String, String> message) {
        log.info("🔥 KAFKA CONSUMER: Processing registration for {}", message.get("email"));

        NotificationDTO notificationDTO = NotificationDTO.builder()
                .recipient(message.get("email"))
                .fullName(message.get("fullName"))
                .subject("Welcome to MG Store!")
                .type(NotificationType.EMAIL)
                .isHtml(true)
                .build();

        notificationService.sendEmail(notificationDTO);
    }
}























