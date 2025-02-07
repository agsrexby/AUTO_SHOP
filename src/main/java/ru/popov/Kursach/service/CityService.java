package ru.popov.Kursach.service;

import org.springframework.stereotype.Service;
import ru.popov.Kursach.models.City;
import ru.popov.Kursach.repositories.CityRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CityService {
    private CityRepository cityRepository;

    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public Optional<City> getCityById(int id) {
        return cityRepository.findById(id);
    }

    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    public void addCity(City city) {
        cityRepository.save(city);
    }

    public void updateCity(int id, City city) {
        cityRepository.update(city,id);
    }

    public void deleteCity(int id) {
        cityRepository.deleteById(id);
    }

}
