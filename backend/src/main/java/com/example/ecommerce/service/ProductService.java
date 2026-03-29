package com.example.ecommerce.service;

import com.example.ecommerce.domain.Product;

import java.util.List;

public interface ProductService {
    List<Product> findAllProducts();
}
