package ru.popov.Kursach.service;

import org.springframework.stereotype.Service;
import ru.popov.Kursach.models.Client;
import ru.popov.Kursach.repositories.ClientRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    private ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Optional<Client> getClientById(int id) {
        return clientRepository.findById(id);
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public void addClient(Client client) {
        clientRepository.save(client);
    }

    public void updateClient(int id, Client client) {
        clientRepository.update(client,id);
    }

    public void deleteClient(int id) {
        clientRepository.deleteById(id);
    }

}
