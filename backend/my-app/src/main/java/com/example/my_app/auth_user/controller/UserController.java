package com.example.my_app.auth_user.controller;

import com.example.my_app.auth_user.dto.UserDTO;
import com.example.my_app.auth_user.service.UserService;
import com.example.my_app.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.ObjectMapper;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response<List<UserDTO>>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUser());
    }

    @PutMapping("/update")
    public ResponseEntity<Response<?>> updateOwnAccount(
            @ModelAttribute UserDTO userDTO,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) throws IOException {

        return ResponseEntity.ok(userService.updateOwnAccount(userDTO, imageFile));
    }

    @GetMapping("/account")
    public ResponseEntity<Response<?>> getOwnAccountDetails(){
        return ResponseEntity.ok(userService.getOwnAccountDetails());
    }
}
