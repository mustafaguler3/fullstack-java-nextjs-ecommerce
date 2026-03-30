package com.example.my_app.service.impl;


import com.example.my_app.domain.Product;
import com.example.my_app.repository.ProductRepository;
import com.example.my_app.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public List<Product> findAllProducts() {
        log.info("inside of product service");
        if (productRepository.count() == 0) {
            return List.of();
        }
        log.info(productRepository.count() + " product counts:");
        return productRepository.findAll();
    }
}
