package com.example.ecommerce.service.impl;

import com.example.ecommerce.domain.Product;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public List<Product> findAllProducts() {

        if (productRepository.count() == 0) {
            return List.of();
        }
        return productRepository.findAll();
    }
}
