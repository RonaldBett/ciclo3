package com.usa.ciclo3.ciclo3.repository;

import com.usa.ciclo3.ciclo3.model.Admin;
import com.usa.ciclo3.ciclo3.repository.crud.AdminCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AdminRepository {

    @Autowired
    private AdminCrudRepository adminCrudRepository;

    public List<Admin> getAll() {
        return (List<Admin>) adminCrudRepository.findAll();
    }
    
    public Optional<Admin> getAdmin(int id){
        return adminCrudRepository.findById(id);
    }
    
    public Admin save(Admin a){
        return adminCrudRepository.save(a);
    }
    
    public void delete(Admin a){
        adminCrudRepository.delete(a);
    }
}
