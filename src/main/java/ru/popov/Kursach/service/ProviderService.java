package ru.popov.Kursach.service;

import org.springframework.stereotype.Service;
import ru.popov.Kursach.models.Provider;
import ru.popov.Kursach.repositories.ProviderRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProviderService {
    private ProviderRepository providerRepository;

    public ProviderService(ProviderRepository providerRepository) {
        this.providerRepository = providerRepository;
    }

    public Optional<Provider> getProviderById(int id) {
        return providerRepository.findById(id);
    }

    public List<Provider> getAllProviders() {
        return providerRepository.findAll();
    }

    public void addProvider(Provider provider) {
        providerRepository.save(provider);
    }

    public void updateProvider(int id, Provider provider) {
        providerRepository.update(provider,id);
    }

    public void deleteProvider(int id) {
        providerRepository.deleteById(id);
    }

}
