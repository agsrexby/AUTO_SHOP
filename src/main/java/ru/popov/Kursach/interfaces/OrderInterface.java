package ru.popov.Kursach.interfaces;

import ru.popov.Kursach.models.Order;

import java.util.List;
import java.util.Optional;

public interface OrderInterface {
    Optional<Order> findById(int id);
    List<Order> findAll();
    void save(Order order);
    void update(Order order, int id);
    void deleteById(int id);
}
