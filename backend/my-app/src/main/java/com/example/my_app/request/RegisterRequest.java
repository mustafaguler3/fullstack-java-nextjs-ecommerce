package com.example.my_app.request;

import com.example.my_app.annotation.PasswordMatches;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;


@Data
public class RegisterRequest {

    @NotBlank(message = "Username must not be blank")
    private String username;
    @NotBlank(message = "Email must not be blank")
    @Email(message = "Email must be right format")
    private String email;
    @NotBlank(message = "Full name must not be blank")
    private String fullName;
    @NotBlank(message = "Password must not be blank")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
    @NotBlank(message = "Confirm password must not be blank")
    private String confirmPassword;
    @NotBlank(message = "Description must not be blank")
    @Size(min = 10, max = 1000, message = "Description must be between 10 and 1000 characters")
    private String description;
    @NotBlank(message = "Phone number must not be blank")
    @Pattern(regexp = "^\\d{10,15}$", message = "Phone number must be digits and 10-15 characters long")
    private String phoneNumber;
}
