/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.usa.ciclo3.ciclo3.service;

import com.usa.ciclo3.ciclo3.model.Cabin;
import com.usa.ciclo3.ciclo3.repository.CabinRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author 57311
 */
@Service
public class CabinService {

    @Autowired
    private CabinRepository cabinRepository;

    public List<Cabin> getAll() {
        return cabinRepository.getAll();
    }

    public Optional<Cabin> getCabin(int id) {
        return cabinRepository.getCabin(id);
    }

    public Cabin save(Cabin c) {
        if (c.getId() == null) {
            return cabinRepository.save(c);
        } else {
            Optional<Cabin> caux = cabinRepository.getCabin(c.getId());
            if (caux.isEmpty()) {
                return cabinRepository.save(c);
            } else {
                return c;
            }
        }
    }

    public Cabin update(Cabin c) {
        if (c.getId() != null) {
            Optional<Cabin> caux = cabinRepository.getCabin(c.getId());
            if (!caux.isEmpty()) {
                if (c.getBrand() != null) {
                    caux.get().setBrand(c.getBrand());
                }
                if (c.getRooms() != null) {
                    caux.get().setRooms(c.getRooms());
                }
                if (c.getCategory() != null) {
                    caux.get().setCategory(c.getCategory());
                }
                if (c.getName() != null) {
                    caux.get().setName(c.getName());
                }
                if (c.getDescription() != null) {
                    caux.get().setDescription(c.getDescription());
                }
                cabinRepository.save(caux.get());
                return caux.get();
            } else {
                return c;
            }
        } else {
            return c;
        }
    }
    
    public boolean delete(int id){
        Boolean cbool = false;
        Optional<Cabin> c = cabinRepository.getCabin(id);
        if (c.isPresent()) {
            cabinRepository.delete(c.get());
            cbool = true;
        }
        return cbool;
    }
}
