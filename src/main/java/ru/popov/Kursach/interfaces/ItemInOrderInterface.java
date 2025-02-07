package ru.popov.Kursach.interfaces;

import ru.popov.Kursach.models.ItemInOrder;

import java.util.List;
import java.util.Optional;

public interface ItemInOrderInterface {
    Optional<ItemInOrder> findById(int id);
    List<ItemInOrder> findAll();
    void save(ItemInOrder itemInOrder);
    void update(ItemInOrder itemInOrder, int id);
    void deleteById(int id);
}
