package com.example.my_app.notification.dto;

import com.example.my_app.enums.NotificationType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@Builder
public class NotificationDTO {

    private long id;
    private String subject;
    @NotBlank(message = "recipient is required")
    private String recipient;
    private String fullName;
    private String body;
    private NotificationType type;
    private final LocalDateTime createdAt;
    private boolean isHtml;

}
