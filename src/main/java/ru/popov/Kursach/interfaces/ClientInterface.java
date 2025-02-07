package ru.popov.Kursach.interfaces;

import ru.popov.Kursach.models.Client;

import java.util.List;
import java.util.Optional;

public interface ClientInterface {
    Optional<Client> findById(int id);
    List<Client> findAll();
    void save(Client client);
    void update(Client client, int id);
    void deleteById(int id);
}
