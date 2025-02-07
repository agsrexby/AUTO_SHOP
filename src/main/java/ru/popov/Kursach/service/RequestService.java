package ru.popov.Kursach.service;

import org.springframework.stereotype.Service;
import ru.popov.Kursach.models.Request;
import ru.popov.Kursach.repositories.RequestRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RequestService {
    private RequestRepository requestRepository;

    public RequestService(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    public Optional<Request> getRequestById(int id) {
        return requestRepository.findById(id);
    }

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public void addRequest(Request request) {
        requestRepository.save(request);
    }

    public void updateRequest(int id, Request request) {
        requestRepository.update(request,id);
    }

    public void deleteRequest(int id) {
        requestRepository.deleteById(id);
    }

}
