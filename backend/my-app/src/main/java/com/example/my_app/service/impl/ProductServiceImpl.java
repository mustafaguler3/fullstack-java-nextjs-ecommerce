package com.example.my_app.service.impl;


import com.example.my_app.domain.Product;
import com.example.my_app.dto.ProductDTO;
import com.example.my_app.repository.ProductRepository;
import com.example.my_app.response.ApiResponse;
import com.example.my_app.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Override
    public ApiResponse<List<ProductDTO>> findAllProducts() {
        log.info("inside of product service");

        List<Product> products = productRepository.findAll();

        if (products.isEmpty()) {
            log.warn("No products found in database");
        }

        log.info(productRepository.count() + " product counts:");

        List<ProductDTO> dtos =
                products
                        .stream()
                        .map(product -> modelMapper.map(product,ProductDTO.class))
                        .toList();

        return ApiResponse.<List<ProductDTO>>
                builder()
                .statusCode(HttpStatus.OK.value())
                .data(dtos)
                .message("Products retrieved successfully")
                .build();
    }
}
