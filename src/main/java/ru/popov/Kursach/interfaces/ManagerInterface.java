package ru.popov.Kursach.interfaces;

import ru.popov.Kursach.models.Manager;

import java.util.List;
import java.util.Optional;

public interface ManagerInterface {
    Optional<Manager> findById(int id);
    List<Manager> findAll();
    void save(Manager manager);
    void update(Manager manager, int id);
    void deleteById(int id);
}
