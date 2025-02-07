package ru.popov.Kursach.interfaces;

import ru.popov.Kursach.models.Manufacturer;

import java.util.List;
import java.util.Optional;

public interface ManufacturerInterface {
    Optional<Manufacturer> findById(int id);
    List<Manufacturer> findAll();
    void save(Manufacturer manufacturer);
    void update(Manufacturer manufacturer, int id);
    void deleteById(int id);
}
