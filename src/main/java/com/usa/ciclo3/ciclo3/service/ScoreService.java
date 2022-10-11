package com.usa.ciclo3.ciclo3.service;

import com.usa.ciclo3.ciclo3.model.Score;
import com.usa.ciclo3.ciclo3.repository.ScoreRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScoreService {
    
    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAll() {
        return scoreRepository.getAll();
    }

    public Optional<Score> getScore(int id) {
        return scoreRepository.getScore(id);
    }

    public Score save(Score s) {
        if (s.getId() == null) {
            return scoreRepository.save(s);
        } else {
            Optional<Score> saux = scoreRepository.getScore(s.getId());
            if (saux.isEmpty()) {
                return scoreRepository.save(s);
            } else {
                return s;
            }
        }
    }

    public Score update(Score s) {
        if (s.getId() != null) {
            Optional<Score> saux = scoreRepository.getScore(s.getId());
            if (!saux.isEmpty()) {
                if (s.getScore() != null) {
                    saux.get().setScore(s.getScore());
                }
                if (s.getMessage() != null) {
                    saux.get().setMessage(s.getMessage());
                }
                if (s.getReservation() != null) {
                    saux.get().setReservation(s.getReservation());
                }
                
                scoreRepository.save(saux.get());
                return saux.get();
            } else {
                return s;
            }
        } else {
            return s;
        }
    }
    
    public boolean delete(int id){
        Boolean sbool = false;
        Optional<Score> s = scoreRepository.getScore(id);
        if (s.isPresent()) {
            scoreRepository.delete(s.get());
            sbool = true;
        }
        return sbool;
    }
}
