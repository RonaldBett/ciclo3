/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.usa.ciclo3.ciclo3.service;

import com.usa.ciclo3.ciclo3.model.Admin;
import com.usa.ciclo3.ciclo3.repository.AdminRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author 57311
 */
@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;
    
    public List<Admin> getAll(){
        return adminRepository.getAll();
    }
    
    public Optional<Admin> getAdmin(int id) {
        return adminRepository.getAdmin(id);
    }

    public Admin save(Admin a) {
        if (a.getId() == null) {
            return adminRepository.save(a);
        } else {
            Optional<Admin> aaux = adminRepository.getAdmin(a.getId());
            if (aaux.isEmpty()) {
                return adminRepository.save(a);
            } else {
                return a;
            }
        }
    }

    public Admin update(Admin a) {
        if (a.getId() != null) {
            Optional<Admin> aaux = adminRepository.getAdmin(a.getId());
            if (!aaux.isEmpty()) {
                if (a.getName() != null) {
                    aaux.get().setName(a.getName());
                }
                if (a.getEmail() != null) {
                    aaux.get().setEmail(a.getEmail());
                }
                if (a.getPassword() != null) {
                    aaux.get().setPassword(a.getPassword());
                }
                adminRepository.save(aaux.get());
                return aaux.get();
            } else {
                return a;
            }
        } else {
            return a;
        }
    }
    
    public boolean delete(int id){
        Boolean abool = false;
        Optional<Admin> a = adminRepository.getAdmin(id);
        if (a.isPresent()) {
            adminRepository.delete(a.get());
            abool = true;
        }
        return abool;
    }
    
}
