package com.example.my_app.auth_user.service;

import com.example.my_app.auth_user.domain.User;
import com.example.my_app.auth_user.dto.UserDTO;
import com.example.my_app.response.Response;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {
    User getCurrentLoggedInUser();
    Response<List<UserDTO>> getAllUser();
    Response<UserDTO> getOwnAccountDetails();
    Response<?> updateOwnAccount(UserDTO userDTO, MultipartFile imageFile) throws IOException;

}
