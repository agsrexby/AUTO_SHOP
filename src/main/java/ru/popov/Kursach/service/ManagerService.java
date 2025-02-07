package ru.popov.Kursach.service;

import org.springframework.stereotype.Service;
import ru.popov.Kursach.models.Manager;
import ru.popov.Kursach.repositories.ManagerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ManagerService {
    private ManagerRepository managerRepository;

    public ManagerService(ManagerRepository managerRepository) {
        this.managerRepository = managerRepository;
    }

    public Optional<Manager> getManagerById(int id) {
        return managerRepository.findById(id);
    }

    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }

    public void addManager(Manager manager) {
        managerRepository.save(manager);
    }

    public void updateManager(int id, Manager manager) {
        managerRepository.update(manager,id);
    }

    public void deleteManager(int id) {
        managerRepository.deleteById(id);
    }

}
