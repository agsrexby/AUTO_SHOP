package ru.popov.Kursach.interfaces;

import ru.popov.Kursach.models.Street;

import java.util.List;
import java.util.Optional;

public interface StreetInterface {
    Optional<Street> findById(int id);
    List<Street> findAll();
    void save(Street street);
    void update(Street street, int id);
    void deleteById(int id);
}
