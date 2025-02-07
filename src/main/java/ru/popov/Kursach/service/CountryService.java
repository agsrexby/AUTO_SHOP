package ru.popov.Kursach.service;

import org.springframework.stereotype.Service;
import ru.popov.Kursach.models.Country;
import ru.popov.Kursach.repositories.CountryRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService {
    private CountryRepository countryRepository;

    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    public Optional<Country> getCountryById(int id) {
        return countryRepository.findById(id);
    }

    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    public void addCountry(Country country) {
        countryRepository.save(country);
    }

    public void updateCountry(int id, Country country) {
       countryRepository.update(country,id);
    }

    public void deleteCountry(int id) {
        countryRepository.deleteById(id);
    }

}
