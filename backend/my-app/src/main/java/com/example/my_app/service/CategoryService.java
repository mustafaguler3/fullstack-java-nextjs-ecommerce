package com.example.my_app.service;

import com.example.my_app.dto.CategoryDTO;
import com.example.my_app.response.ApiResponse;

import java.util.List;

public interface CategoryService {
    ApiResponse<CategoryDTO> addCategory(CategoryDTO categoryDTO);
    ApiResponse<CategoryDTO> updateCategory(CategoryDTO categoryDTO);
    ApiResponse<CategoryDTO> getCategoryById(Long id);
    ApiResponse<List<CategoryDTO>> getAllCategories();
    ApiResponse<?> deleteCategory(Long id);
}
