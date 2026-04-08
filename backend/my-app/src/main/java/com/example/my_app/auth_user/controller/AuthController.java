package com.example.my_app.auth_user.controller;

import com.example.my_app.request.LoginRequest;
import com.example.my_app.request.RegisterRequest;
import com.example.my_app.response.Response;
import com.example.my_app.response.AuthResponse;
import com.example.my_app.auth_user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;

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

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Response<?>> register(
            @RequestPart("request") @Valid RegisterRequest request,
            BindingResult bindingResult,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) throws IOException {

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(
                    Response.builder()
                            .message(bindingResult.getFieldError().getDefaultMessage())
                            .build()
            );
        }

        authService.register(request, imageFile);

        return ResponseEntity.ok(Response.builder().message("User registered!").build());
    }
}
