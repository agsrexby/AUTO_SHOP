package ru.popov.Kursach.service;

import org.springframework.stereotype.Service;
import ru.popov.Kursach.models.Street;
import ru.popov.Kursach.repositories.StreetRepository;

import java.util.List;
import java.util.Optional;

@Service
public class StreetService {
    private StreetRepository streetRepository;

    public StreetService(StreetRepository streetRepository) {
        this.streetRepository = streetRepository;
    }

    public Optional<Street> getStreetById(int id) {
        return streetRepository.findById(id);
    }

    public List<Street> getAllStreets() {
        return streetRepository.findAll();
    }

    public void addStreet(Street street) {
        streetRepository.save(street);
    }

    public void updateStreet(int id, Street street) {
        streetRepository.update(street,id);
    }

    public void deleteStreet(int id) {
        streetRepository.deleteById(id);
    }

}
