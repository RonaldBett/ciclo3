package com.usa.ciclo3.ciclo3.repository.crud;

import com.usa.ciclo3.ciclo3.model.Reservation;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ReservationCrudRepository extends CrudRepository<Reservation,Integer>{
    
    public List<Reservation> findAllByStartDateAfterAndStartDateBefore(Date firstDate, Date lastDate);
    
    public List<Reservation> findAllByStatus(String status);
    
    @Query("SELECT COUNT(r.client), r.client FROM Reservation AS r group by r.client order by COUNT(r.client) desc")
    public List<Object[]> countReservationsByClient();
}
