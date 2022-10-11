package com.usa.ciclo3.ciclo3.service;

import com.usa.ciclo3.ciclo3.model.Client;
import com.usa.ciclo3.ciclo3.repository.ClientRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAll() {
        return clientRepository.getAll();
    }

    public Optional<Client> getClient(int id) {
        return clientRepository.getClient(id);
    }

    public Client save(Client c) {
        if (c.getIdClient() == null) {
            return clientRepository.save(c);
        } else {
            Optional<Client> caux = clientRepository.getClient(c.getIdClient());
            if (caux.isEmpty()) {
                return clientRepository.save(c);
            } else {
                return c;
            }
        }
    }

    public Client update(Client c) {
        if (c.getIdClient() != null) {
            Optional<Client> caux = clientRepository.getClient(c.getIdClient());
            if (!caux.isEmpty()) {
                if (c.getEmail() != null) {
                    caux.get().setEmail(c.getEmail());
                }
                if (c.getPassword() != null) {
                    caux.get().setPassword(c.getPassword());
                }
                if (c.getName() != null) {
                    caux.get().setName(c.getName());
                }
                if (c.getAge() != null) {
                    caux.get().setAge(c.getAge());
                }
                clientRepository.save(caux.get());
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
        Optional<Client> c = clientRepository.getClient(id);
        if (c.isPresent()) {
            clientRepository.delete(c.get());
            cbool = true;
        }
        return cbool;
    }
}
