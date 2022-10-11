package com.usa.ciclo3.ciclo3.repository;

import com.usa.ciclo3.ciclo3.model.Cabin;
import com.usa.ciclo3.ciclo3.repository.crud.CabinCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CabinRepository {
    
    @Autowired
    private CabinCrudRepository cabinCrudRepository;
    
    public List<Cabin> getAll(){
        return (List<Cabin>) cabinCrudRepository.findAll();
    }
    
    public Optional<Cabin> getCabin(int id){
        return cabinCrudRepository.findById(id);
    }
    
    public Cabin save(Cabin c){
        return cabinCrudRepository.save(c);
    }
    
    public void delete(Cabin c){
        cabinCrudRepository.delete(c);
    }
}
