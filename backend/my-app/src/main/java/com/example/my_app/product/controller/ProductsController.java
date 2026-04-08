package com.example.my_app.product.controller;


import com.example.my_app.product.dto.ProductDTO;
import com.example.my_app.response.Response;
import com.example.my_app.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductsController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<Response<List<ProductDTO>>> findAllProducts(){
        return ResponseEntity.ok(productService.findAllProducts());
    }
}
