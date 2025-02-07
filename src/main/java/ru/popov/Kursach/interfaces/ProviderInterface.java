package ru.popov.Kursach.interfaces;

import ru.popov.Kursach.models.Provider;
import ru.popov.Kursach.models.Request;

import java.util.List;
import java.util.Optional;

public interface ProviderInterface {
    Optional<Provider> findById(int id);
    List<Provider> findAll();
    void save(Provider provider);
    void update(Provider provider, int id);
    void deleteById(int id);
}
