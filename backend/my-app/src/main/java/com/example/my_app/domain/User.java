package com.example.my_app.domain;

import com.example.my_app.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Username must not be blank")
    private String username;
    @NotBlank(message = "Email must not be blank")
    @Email(message = "Email must be right format")
    private String email;
    @NotBlank(message = "Password must not be blank")
    @Size(min = 3, message = "Password must be at least 6 characters")
    private String password;
    @NotBlank(message = "Description must not be blank")
    @Size(min = 10,max = 1000)
    private String description;
    private String profilePicture;
    private Boolean isEnabled = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;
}
