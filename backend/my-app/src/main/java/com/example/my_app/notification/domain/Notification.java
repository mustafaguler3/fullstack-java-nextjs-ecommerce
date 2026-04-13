package com.example.my_app.notification.domain;

import com.example.my_app.enums.NotificationType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.apache.kafka.common.protocol.types.Field;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "notifications")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String subject;
    @NotBlank(message = "recipient is required")
    private String recipient;
    private String fullName;
    @Lob
    private String body;
    @Enumerated(EnumType.STRING)
    private NotificationType type;
    private final LocalDateTime createdAt = LocalDateTime.now();
    private boolean isHtml;
}
