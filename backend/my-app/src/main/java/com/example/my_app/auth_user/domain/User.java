package com.example.my_app.auth_user.domain;

import com.example.my_app.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


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
    private String username;
    private String fullName;
    private String email;
    private String password;
    private String description;
    private String phoneNumber;
    private String profilePicture;
    private Boolean isEnabled = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;
}
