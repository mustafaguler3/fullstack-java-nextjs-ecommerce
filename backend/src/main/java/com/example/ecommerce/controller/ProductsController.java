package com.example.ecommerce.controller;

import com.example.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProductsController {

    private final ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<?> findAllProducts(){
        return ResponseEntity.ok(productService.findAllProducts());
    }
}
