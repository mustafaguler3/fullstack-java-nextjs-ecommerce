package com.example.my_app.auth_user.service;

import com.example.my_app.request.LoginRequest;
import com.example.my_app.request.RegisterRequest;
import com.example.my_app.response.AuthResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface AuthService {
    AuthResponse login(LoginRequest request);
    void register(RegisterRequest request);
}
