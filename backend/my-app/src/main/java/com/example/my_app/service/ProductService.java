package com.example.my_app.service;


import com.example.my_app.domain.Product;

import java.util.List;

public interface ProductService {
    List<Product> findAllProducts();
}
