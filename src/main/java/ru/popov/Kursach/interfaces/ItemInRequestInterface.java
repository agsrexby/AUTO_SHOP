package ru.popov.Kursach.interfaces;

import ru.popov.Kursach.models.ItemInRequest;

import java.util.List;
import java.util.Optional;

public interface ItemInRequestInterface {
    Optional<ItemInRequest> findById(int id);
    List<ItemInRequest> findAll();
    void save(ItemInRequest itemInRequest);
    void update(ItemInRequest itemInRequest, int id);
    void deleteById(int id);
}
