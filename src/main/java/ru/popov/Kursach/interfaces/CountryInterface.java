package ru.popov.Kursach.interfaces;

import ru.popov.Kursach.models.Country;

import java.util.List;
import java.util.Optional;

public interface CountryInterface {
    Optional<Country> findById(int id);
    List<Country> findAll();
    void save(Country country);
    void update(Country country, int id);
    void deleteById(int id);
}
