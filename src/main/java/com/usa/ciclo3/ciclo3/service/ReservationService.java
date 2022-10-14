package com.usa.ciclo3.ciclo3.service;

import com.usa.ciclo3.ciclo3.model.Reservation;
import com.usa.ciclo3.ciclo3.model.custome.ReservationsByClient;
import com.usa.ciclo3.ciclo3.model.custome.StatusReport;
import com.usa.ciclo3.ciclo3.repository.ReservationRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    
    public List<Reservation> getReservationsByDate(String firstDate, String lastDate){
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        Date fd = new Date();
        Date ld = new Date();
        try {
            fd = parser.parse(firstDate);
            ld = parser.parse(lastDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        if(fd.before(ld)){
            return reservationRepository.getReservationsByDate(fd, ld);
        }else{
            return new ArrayList<>();
        }
    }
    
    public StatusReport getReservationsByStatus(){
        List<Reservation> completed = reservationRepository.getReservationsByStatus("completed");
        List<Reservation> cancelled = reservationRepository.getReservationsByStatus("cancelled");
        
        return new StatusReport(completed.size(), cancelled.size());
    }
    
    public List<ReservationsByClient> getReservationsByClient(){
        return reservationRepository.getReservationsByClient();
    }
}
