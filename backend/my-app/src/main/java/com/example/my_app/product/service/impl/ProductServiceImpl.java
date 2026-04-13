package com.example.my_app.product.service.impl;


import com.example.my_app.product.domain.Product;
import com.example.my_app.product.dto.ProductDTO;
import com.example.my_app.exception.ApiException;
import com.example.my_app.product.repository.ProductRepository;
import com.example.my_app.response.Response;
import com.example.my_app.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public Response<Page<ProductDTO>> findAllProducts(int page, int size, String sortBy, String sortDir) {
        log.info("Fetching products with pagination: page {}, size {}", page, size);

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Product> productPage = productRepository.findAll(pageable);

        if (productPage.isEmpty()) {
            log.warn("No products found for page {}", page);
            throw new ApiException("No products found", HttpStatus.NOT_FOUND);
        }

        Page<ProductDTO> dtos = productPage.map(product -> modelMapper.map(product, ProductDTO.class));

        return Response.<Page<ProductDTO>>builder()
                .statusCode(HttpStatus.OK.value())
                .data(dtos)
                .message("Products retrieved successfully")
                .build();
    }
}
