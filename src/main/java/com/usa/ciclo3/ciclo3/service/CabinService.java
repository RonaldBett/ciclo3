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
    
    public List<Cabin> getAll(){
        return cabinRepository.getAll();
    }
    
    public Optional<Cabin> getCabin(int id){
        return cabinRepository.getCabin(id);
    }
    
    public Cabin save(Cabin c){
        if(c.getId()==null){
            return cabinRepository.save(c);
        }else{
            Optional<Cabin> caux = cabinRepository.getCabin(c.getId());
            if(caux.isEmpty()){
                return cabinRepository.save(c);
            }else{
                return c;
            }
        }
    }
}
