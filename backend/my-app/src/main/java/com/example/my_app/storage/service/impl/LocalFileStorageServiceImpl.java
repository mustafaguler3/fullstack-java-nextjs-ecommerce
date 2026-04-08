package com.example.my_app.storage.service.impl;

import com.example.my_app.storage.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
public class LocalFileStorageServiceImpl implements FileStorageService {

    private Path fileLocation;

    @Autowired
    public LocalFileStorageServiceImpl(@Value("${app.upload.dir}") String uploadDir) {
        this.fileLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileLocation.resolve("products"));
            Files.createDirectories(this.fileLocation.resolve("users"));
        } catch (Exception e) {
            throw new RuntimeException("Could not create storage directory!", e);
        }
    }

    @Override
    public String storeFile(MultipartFile file, String fileType) {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        try {
            if (fileName.contains("..")) {
                throw new RuntimeException("invalid file path!");
            }

            Path targetLocation = this.fileLocation.resolve(fileType).resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException e) {
            throw new RuntimeException("File could not saved: " + fileName, e);
        }
    }

    @Override
    public Resource loadFile(String fileName, String fileType) {
        try {
            Path filePath = this.fileLocation.resolve(fileType).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("File could not find: " + fileName);
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("File path error!", e);
        }
    }

    @Override
    public void deleteFile(String fileName, String fileType) {
        try {
            Path filePath = this.fileLocation.resolve(fileType).resolve(fileName).normalize();
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("File could not deleted!", e);
        }
    }
}
