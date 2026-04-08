package com.example.my_app.auth_user.mapper;

import com.example.my_app.auth_user.domain.User;
import com.example.my_app.auth_user.dto.UserDTO;

public class UserMapper {

    public static UserDTO toResponse(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .description(user.getDescription())
                .profilePicture(user.getProfilePicture())
                .isEnabled(user.getIsEnabled())
                .userRole(user.getRole())
                .build();
    }
}
