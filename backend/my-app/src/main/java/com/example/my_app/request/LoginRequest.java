package com.example.my_app.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
