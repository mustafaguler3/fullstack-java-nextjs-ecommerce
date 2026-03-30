package com.example.my_app.service.impl;


import com.example.my_app.domain.Product;
import com.example.my_app.repository.ProductRepository;
import com.example.my_app.response.ApiResponse;
import com.example.my_app.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public ApiResponse<List<Product>> findAllProducts() {
        log.info("inside of product service");

        List<Product> products = productRepository.findAll();

        if (products.isEmpty()) {
            throw  new RuntimeException("No product found");
        }
        log.info(productRepository.count() + " product counts:");

        return ApiResponse.<List<Product>>
                builder()
                .statusCode(HttpStatus.OK.value())
                .data(products)
                .message("Products retrieved successfully")
                .build();
    }
}
