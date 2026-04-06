package com.example.my_app.controller;

import com.example.my_app.repository.UserRepository;
import com.example.my_app.request.LoginRequest;
import com.example.my_app.request.RegisterRequest;
import com.example.my_app.response.ApiResponse;
import com.example.my_app.response.AuthResponse;
import com.example.my_app.security.JwtUtils;
import com.example.my_app.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> authenticateUser(@RequestBody LoginRequest loginRequest) {
        AuthResponse authResponse = authService.login(loginRequest);

        return ResponseEntity.ok(ApiResponse.<AuthResponse>builder()
                .statusCode(200)
                .message("Session initialized successfully")
                .data(authResponse)
                .build());
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> registerUser(@RequestBody RegisterRequest signUpRequest) {

        authService.register(signUpRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<String>builder()
                .statusCode(201)
                .message("User registered to MG STORE core database")
                .data("Registration Successful")
                .build());
    }
}
