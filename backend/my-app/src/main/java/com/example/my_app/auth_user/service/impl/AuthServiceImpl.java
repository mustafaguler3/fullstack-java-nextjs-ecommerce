package com.example.my_app.auth_user.service.impl;

import com.example.my_app.auth_user.domain.User;
import com.example.my_app.enums.UserRole;
import com.example.my_app.auth_user.mapper.UserMapper;
import com.example.my_app.auth_user.repository.UserRepository;
import com.example.my_app.request.LoginRequest;
import com.example.my_app.request.RegisterRequest;
import com.example.my_app.response.AuthResponse;
import com.example.my_app.security.JwtUtils;
import com.example.my_app.auth_user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthResponse login(LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow();

        return AuthResponse.builder()
                .token(jwt)
                .user(UserMapper.toResponse(user))
                .build();
    }

    public void register(RegisterRequest request, MultipartFile imageFile) throws IOException {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use!");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhoneNumber(request.getPhoneNumber());
        user.setDescription(request.getDescription());
        user.setIsEnabled(true);
        user.setRole(UserRole.ROLE_CUSTOMER);

        if (imageFile != null && !imageFile.isEmpty()) {
            String uploadDir = Paths.get(System.getProperty("user.dir"), "uploads", "profile").toString();
            Files.createDirectories(Paths.get(uploadDir));

            String imageName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
            Path path = Paths.get(uploadDir, imageName);
            imageFile.transferTo(path.toFile());

            user.setProfilePicture("/uploads/profile/" + imageName);
        } else {
            user.setProfilePicture("/uploads/profile/default-avatar.png");
        }

        userRepository.save(user);

    }
}
