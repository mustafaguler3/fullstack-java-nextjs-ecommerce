package com.example.my_app.notification.service.impl;

import com.example.my_app.notification.domain.Notification;
import com.example.my_app.notification.dto.NotificationDTO;
import com.example.my_app.notification.repository.NotificationRepository;
import com.example.my_app.notification.service.NotificationService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine springTemplateEngine;

    @Override
    @Transactional
    public void sendEmail(NotificationDTO notificationDTO) {
        log.info("Dispatching modern email to: {}", notificationDTO.getRecipient());

        try {
            Context context = new Context();
            context.setVariable("fullName", notificationDTO.getFullName());

            String htmlContent = springTemplateEngine.process("welcome-email", context);

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(notificationDTO.getRecipient());
            helper.setSubject(notificationDTO.getSubject());
            helper.setText(htmlContent, true);

            javaMailSender.send(mimeMessage);

            // Save to DB
            notificationRepository.save(Notification.builder()
                    .recipient(notificationDTO.getRecipient())
                    .subject(notificationDTO.getSubject())
                    .body(htmlContent)
                    .type(notificationDTO.getType())
                    .isHtml(true)
                    .build());

        } catch (Exception e) {
            log.error("Modern email failed: ", e);
        }
    }
}
