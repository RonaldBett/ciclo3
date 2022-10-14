package com.usa.ciclo3.ciclo3.repository;

import com.usa.ciclo3.ciclo3.model.Client;
import com.usa.ciclo3.ciclo3.model.Reservation;
import com.usa.ciclo3.ciclo3.model.custome.ReservationsByClient;
import com.usa.ciclo3.ciclo3.repository.crud.ReservationCrudRepository;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ReservationRepository {
    
    @Autowired
    private ReservationCrudRepository reservationCrudRepository;
    
    public List<Reservation> getAll(){
        return (List<Reservation>) reservationCrudRepository.findAll();
    }
    
    public Optional<Reservation> getReservation(int id){
        return reservationCrudRepository.findById(id);
    }
    
    public Reservation save(Reservation r){
        return reservationCrudRepository.save(r);
    }
    
    public void delete(Reservation c){
        reservationCrudRepository.delete(c);
    }
    
    public List<Reservation> getReservationsByDate(Date firstDate, Date lastDate){
        return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(firstDate, lastDate);
    }
    
    public List<Reservation> getReservationsByStatus(String status){
        return reservationCrudRepository.findAllByStatus(status);
    }
    
    public List<ReservationsByClient> getReservationsByClient(){
        List<Object[]> obj = reservationCrudRepository.countReservationsByClient();
        List<ReservationsByClient> rbc = new ArrayList<>();
        for(int i = 0; i<obj.size(); i++){
            rbc.add(new ReservationsByClient((long) obj.get(i)[0], (Client) obj.get(i)[1]));
        }
        return rbc;
    }
}
