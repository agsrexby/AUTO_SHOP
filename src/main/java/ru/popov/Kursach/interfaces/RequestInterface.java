package ru.popov.Kursach.interfaces;

import ru.popov.Kursach.models.Request;

import java.util.List;
import java.util.Optional;

public interface RequestInterface {
    Optional<Request> findById(int id);
    List<Request> findAll();
    void save(Request request);
    void update(Request request, int id);
    void deleteById(int id);
}
