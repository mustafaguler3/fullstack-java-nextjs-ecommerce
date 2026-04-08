package com.example.my_app.auth_user.service.impl;

import com.example.my_app.auth_user.domain.User;
import com.example.my_app.auth_user.dto.UserDTO;
import com.example.my_app.exception.NotFoundException;
import com.example.my_app.auth_user.repository.UserRepository;
import com.example.my_app.notification.service.NotificationService;
import com.example.my_app.response.Response;
import com.example.my_app.auth_user.service.UserService;
import com.example.my_app.security.JwtUtils;
import com.example.my_app.security.UserDetailsImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final JwtUtils jwtUtils;
    //private final NotificationService notificationService;
    //private final AWSS3Service awss3Service;

    @Override
    public User getCurrentLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl principal = (UserDetailsImpl) authentication.getPrincipal();

        if (principal != null) {

            return userRepository.findById(principal.getId())
                    .orElseThrow(() -> new NotFoundException("User not found with id: " + principal.getId()));
        }

        throw new NotFoundException("Invalid authentication principal");
    }
    @Override
    public Response<List<UserDTO>> getAllUser() {
        log.info("Inside getAllUser()");
        List<User> users = userRepository.findAll(Sort.by(Sort.Direction.DESC,"id"));
        List<UserDTO> userDTOS = modelMapper.map(users,new TypeToken<List<UserDTO>>() {
        }.getType());
        return Response.<List<UserDTO>>builder()
                .statusCode(HttpStatus.OK.value())
                .message("All users retrieved successfully")
                .data(userDTOS)
                .build();
    }

    @Override
    public Response<UserDTO> getOwnAccountDetails() {

        User user = getCurrentLoggedInUser();
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);

        return Response.<UserDTO>builder()
                .statusCode(HttpStatus.OK.value())
                .message("success")
                .data(userDTO)
                .build();
    }

    @Override
    public Response<?> updateOwnAccount(UserDTO userDTO, MultipartFile imageFile) throws IOException {

        User user = getCurrentLoggedInUser();
        boolean emailChanged = false;

        if (imageFile != null && !imageFile.isEmpty()) {
            String uploadDir = Paths.get(System.getProperty("user.dir"), "uploads", "profile").toString();
            Files.createDirectories(Paths.get(uploadDir));

            String imageName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
            Path path = Paths.get(uploadDir, imageName);
            imageFile.transferTo(path.toFile());

            user.setProfilePicture("/uploads/profile/" + imageName);
        }

        if (userDTO.getFullName() != null) user.setFullName(userDTO.getFullName());
        if (userDTO.getUsername() != null) user.setUsername(userDTO.getUsername());

        if (userDTO.getEmail() != null && !userDTO.getEmail().equals(user.getEmail())) {
            user.setEmail(userDTO.getEmail());
            emailChanged = true;
        }

        if (userDTO.getPhoneNumber() != null) {
            user.setPhoneNumber(userDTO.getPhoneNumber());
        }

        User updatedUser = userRepository.save(user);

        UserDTO responseDto = new UserDTO();
        responseDto.setId(updatedUser.getId());
        responseDto.setFullName(updatedUser.getFullName());
        responseDto.setEmail(updatedUser.getEmail());
        responseDto.setPhoneNumber(updatedUser.getPhoneNumber());
        responseDto.setProfilePicture(updatedUser.getProfilePicture());
        responseDto.setUsername(updatedUser.getUsername());
        responseDto.setUserRole(updatedUser.getRole());
        responseDto.setIsEnabled(updatedUser.getIsEnabled());

        if (emailChanged) {
            UserDetailsImpl userDetails = new UserDetailsImpl(updatedUser);

            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            String newToken = jwtUtils.generateJwtToken(authentication);

            return Response.<UserDTO>builder()
                    .statusCode(HttpStatus.OK.value())
                    .message("Account updated successfully")
                    .data(responseDto)
                    .meta(Map.of("token", newToken))
                    .build();
        }

        return Response.<UserDTO>builder()
                .statusCode(HttpStatus.OK.value())
                .message("Account updated successfully")
                .data(responseDto)
                .build();
    }
}




















