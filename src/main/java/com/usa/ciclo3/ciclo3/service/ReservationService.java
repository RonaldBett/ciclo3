/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.usa.ciclo3.ciclo3.service;

import com.usa.ciclo3.ciclo3.model.Reservation;
import com.usa.ciclo3.ciclo3.repository.ReservationRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author 57311
 */
@Service
public class ReservationService {
    
    @Autowired
    private ReservationRepository reservationRepository;
    
    public List<Reservation> getAll(){
        return reservationRepository.getAll();
    }
    
    public Optional<Reservation> getReservation(int id){
        return reservationRepository.getReservation(id);
    }
    
    public Reservation save(Reservation r){
        if(r.getIdReservation()==null){
            return reservationRepository.save(r);
        }else{
            Optional<Reservation> caux = reservationRepository.getReservation(r.getIdReservation());
            if(caux.isEmpty()){
                return reservationRepository.save(r);
            }else{
                return r;
            }
        }
    }
    
    public Reservation update(Reservation r) {
        if (r.getIdReservation()!= null) {
            Optional<Reservation> raux = reservationRepository.getReservation(r.getIdReservation());
            if (!raux.isEmpty()) {
                if (r.getStartDate() != null) {
                    raux.get().setStartDate(r.getStartDate());
                }
                if (r.getDevolutionDate() != null) {
                    raux.get().setDevolutionDate(r.getDevolutionDate());
                }
                if (r.getStatus() != null) {
                    raux.get().setStatus(r.getStatus());
                }
                if (r.getCabin() != null) {
                    raux.get().setCabin(r.getCabin());
                }
                if (r.getClient() != null) {
                    raux.get().setClient(r.getClient());
                }
                
                reservationRepository.save(raux.get());
                return raux.get();
            } else {
                return r;
            }
        } else {
            return r;
        }
    }
    
    public boolean delete(int id){
        Boolean rbool = false;
        Optional<Reservation> c = reservationRepository.getReservation(id);
        if (c.isPresent()) {
            reservationRepository.delete(c.get());
            rbool = true;
        }
        return rbool;
    }
    
}
