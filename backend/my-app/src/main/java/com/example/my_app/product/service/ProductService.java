package com.example.my_app.product.service;


import com.example.my_app.product.dto.ProductDTO;
import com.example.my_app.response.Response;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    Response<Page<ProductDTO>> findAllProducts(int page, int size, String sortBy, String sortDir);
}
