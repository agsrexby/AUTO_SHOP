package ru.popov.Kursach.interfaces;

import ru.popov.Kursach.models.City;

import java.util.List;
import java.util.Optional;

public interface CityInterface {
    Optional<City> findById(int id);
    List<City> findAll();
    void save(City city);
    void update(City city, int id);
    void deleteById(int id);
}
