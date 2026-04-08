package com.example.my_app.category.service;

import com.example.my_app.category.dto.CategoryDTO;
import com.example.my_app.response.Response;

import java.util.List;

public interface CategoryService {
    Response<CategoryDTO> addCategory(CategoryDTO categoryDTO);
    Response<CategoryDTO> updateCategory(CategoryDTO categoryDTO);
    Response<CategoryDTO> getCategoryById(Long id);
    Response<List<CategoryDTO>> getAllCategories();
    Response<?> deleteCategory(Long id);
}
