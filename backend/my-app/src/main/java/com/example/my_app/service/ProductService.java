package com.example.my_app.service;


import com.example.my_app.domain.Product;
import com.example.my_app.response.ApiResponse;

import java.util.List;

public interface ProductService {
    ApiResponse<List<Product>> findAllProducts();
}
