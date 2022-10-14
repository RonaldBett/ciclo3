package com.usa.ciclo3.ciclo3.model.custome;

import com.usa.ciclo3.ciclo3.model.Client;

public class ReservationsByClient {
    
    private long total;
    private Client client;

    public ReservationsByClient(long total, Client client) {
        this.total = total;
        this.client = client;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    
    
}
