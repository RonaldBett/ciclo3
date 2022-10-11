package com.usa.ciclo3.ciclo3.service;

import com.usa.ciclo3.ciclo3.model.Category;
import com.usa.ciclo3.ciclo3.repository.CategoryRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAll() {
        return categoryRepository.getAll();
    }

    public Optional<Category> getCategory(int id) {
        return categoryRepository.getCategory(id);
    }

    public Category save(Category c) {
        if (c.getId() == null) {
            return categoryRepository.save(c);
        } else {
            Optional<Category> caux = categoryRepository.getCategory(c.getId());
            if (caux.isEmpty()) {
                return categoryRepository.save(c);
            } else {
                return c;
            }
        }
    }

    public Category update(Category c) {
        if (c.getId() != null) {
            Optional<Category> caux = categoryRepository.getCategory(c.getId());
            if (!caux.isEmpty()) {
                if (c.getName() != null) {
                    caux.get().setName(c.getName());
                }
                if (c.getDescription() != null) {
                    caux.get().setDescription(c.getDescription());
                }
                if (c.getCabins() != null) {
                    caux.get().setCabins(c.getCabins());
                }
                categoryRepository.save(caux.get());
                return caux.get();
            } else {
                return c;
            }
        } else {
            return c;
        }
    }
    
    public boolean delete(int id){
        Boolean cbool = getCategory(id).map(category -> {
            categoryRepository.delete(category);
            return true;
        }).orElse(Boolean.FALSE);
        return cbool;
    }

}
