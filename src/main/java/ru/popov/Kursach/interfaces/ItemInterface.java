package ru.popov.Kursach.interfaces;

import ru.popov.Kursach.models.Item;

import java.util.List;
import java.util.Optional;

public interface ItemInterface {
    Optional<Item> findById(int id);
    List<Item> findAll();
    void save(Item item);
    void update(Item item, int id);
    void deleteById(int id);
}
