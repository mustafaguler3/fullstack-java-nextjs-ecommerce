package com.example.my_app.auth_user.dto;

import com.example.my_app.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {

    private Long id;
    @NotBlank(message = "Username must not be blank")
    private String username;
    private String fullName;
    @NotBlank(message = "Email must not be blank")
    @Email(message = "Email must be right format")
    private String email;
    @NotBlank(message = "Description must not be blank")
    @Size(min = 10,max = 1000)
    private String description;
    private String phoneNumber;
    private String profilePicture;
    private Boolean isEnabled = false;
    private UserRole userRole;
}
