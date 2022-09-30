/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.usa.ciclo3.ciclo3.repository.crud;

import com.usa.ciclo3.ciclo3.model.Message;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author 57311
 */
public interface MessageCrudRepository extends CrudRepository<Message,Integer>{
    
}
