package ru.popov.Kursach.interfaces;

import ru.popov.Kursach.models.BrokenItem;

import java.util.List;
import java.util.Optional;

public interface BrokenItemInterface {
    Optional<BrokenItem> findById(int id);
    List<BrokenItem> findAll();
    void save(BrokenItem brokenItem);
    void update(BrokenItem brokenItem, int id);
    void deleteById(int id);
}
