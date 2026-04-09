package com.example.my_app.auth_user.controller;

import com.example.my_app.request.LoginRequest;
import com.example.my_app.request.RegisterRequest;
import com.example.my_app.response.Response;
import com.example.my_app.response.AuthResponse;
import com.example.my_app.auth_user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Response<AuthResponse>> authenticateUser(@RequestBody LoginRequest loginRequest) {
        AuthResponse authResponse = authService.login(loginRequest);

        return ResponseEntity.ok(Response.<AuthResponse>builder()
                .statusCode(200)
                .message("Session initialized successfully")
                .data(authResponse)
                .build());
    }

    @PostMapping("/register")
    public ResponseEntity<Response<?>> register(
            @Valid @RequestBody RegisterRequest request)  {

        authService.register(request);

        return ResponseEntity.ok(Response.<AuthResponse>builder()
                .statusCode(200)
                .message("User registered")
                .build());
    }
}
