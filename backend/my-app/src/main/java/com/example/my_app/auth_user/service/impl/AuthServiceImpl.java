package com.example.my_app.auth_user.service.impl;

import com.example.my_app.auth_user.domain.User;
import com.example.my_app.enums.UserRole;
import com.example.my_app.auth_user.mapper.UserMapper;
import com.example.my_app.auth_user.repository.UserRepository;
import com.example.my_app.request.LoginRequest;
import com.example.my_app.request.RegisterRequest;
import com.example.my_app.response.AuthResponse;
import com.example.my_app.security.JwtUtils;
import com.example.my_app.auth_user.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public AuthResponse login(LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow();

        return AuthResponse.builder()
                .token(jwt)
                .user(UserMapper.toResponse(user))
                .build();
    }

    public void register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use!");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match!");
        }

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhoneNumber(request.getPhoneNumber());
        user.setDescription(request.getDescription());
        user.setIsEnabled(true);
        user.setRole(UserRole.ROLE_CUSTOMER);

        userRepository.save(user);

        try {
            Map<String, String> message = new HashMap<>();
            message.put("email", user.getEmail());
            message.put("username", user.getUsername());
            message.put("fullName", user.getFullName());

            kafkaTemplate.send("user-registration-topic", message);
            log.info("Kafka: User registration message sent successfully.: {}", user.getEmail());
        } catch (Exception e) {
            log.error("Kafka's message could not be sent.: ", e);
        }

    }
}
