package com.example.my_app.product.service;


import com.example.my_app.product.dto.ProductDTO;
import com.example.my_app.response.Response;

import java.util.List;

public interface ProductService {
    Response<List<ProductDTO>> findAllProducts();
}
