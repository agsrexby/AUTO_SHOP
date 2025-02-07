package ru.popov.Kursach.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.popov.Kursach.models.Manufacturer;
import ru.popov.Kursach.repositories.ManufacturerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ManufacturerService {
    private ManufacturerRepository manufacturerRepository;

    public ManufacturerService(ManufacturerRepository manufacturerRepository) {
        this.manufacturerRepository = manufacturerRepository;
    }

    public Optional<Manufacturer> getManufacturerById(int id) {
        return manufacturerRepository.findById(id);
    }

    public List<Manufacturer> getAllManufacturers() {
        return manufacturerRepository.findAll();
    }

    public void addManufacturer(Manufacturer manufacturer) {
        manufacturerRepository.save(manufacturer);
    }

    public void updateManufacturer(int id, Manufacturer manufacturer) {
        manufacturerRepository.update(manufacturer,id);
    }

    public void deleteManufacturer(int id) {
        manufacturerRepository.deleteById(id);
    }

}
