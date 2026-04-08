package com.example.my_app.category.service.impl;

import com.example.my_app.category.domain.Category;
import com.example.my_app.category.dto.CategoryDTO;
import com.example.my_app.exception.NotFoundException;
import com.example.my_app.category.repository.CategoryRepository;
import com.example.my_app.response.Response;
import com.example.my_app.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    @Override
    public Response<CategoryDTO> addCategory(CategoryDTO categoryDTO) {

        Category category = modelMapper.map(categoryDTO,Category.class);

        categoryRepository.save(category);

        return Response.<CategoryDTO>builder()
                .statusCode(HttpStatus.OK.value())
                .message("Category added successfully")
                .build();
    }

    @Override
    public Response<CategoryDTO> updateCategory(CategoryDTO categoryDTO) {
        log.info("Inside updateCategory()");

        Category category = categoryRepository.findById(categoryDTO.getId())
                .orElseThrow(() -> new NotFoundException("Category not found"));

        if (categoryDTO.getName() != null && !categoryDTO.getName().isEmpty()) category.setName(category.getName());
        if (categoryDTO.getDescription() != null) category.setDescription(category.getDescription());

        categoryRepository.save(category);

        return Response.<CategoryDTO>builder()
                .statusCode(HttpStatus.OK.value())
                .message("Category updated successfully")
                .build();
    }

    @Override
    public Response<CategoryDTO> getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Category not found"));

        CategoryDTO categoryDTO = modelMapper.map(category,CategoryDTO.class);

        return Response.<CategoryDTO>builder()
                .statusCode(HttpStatus.OK.value())
                .message("Category retrieved successfully")
                .build();
    }

    @Override
    public Response<List<CategoryDTO>> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();

        List<CategoryDTO> categoryDTOS = categories.stream()
                .map(category -> modelMapper.map(category,CategoryDTO.class))
                .toList();

        return Response.<List<CategoryDTO>>builder()
                .statusCode(HttpStatus.OK.value())
                .message("All categories retrieved successfully")
                .data(categoryDTOS)
                .build();
    }

    @Override
    public Response<?> deleteCategory(Long id) {

        if (!categoryRepository.existsById(id)) {
            throw new NotFoundException("Category not found");
        }
        categoryRepository.deleteById(id);

        return Response.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Category deleted successfully")
                .build();
    }
}
