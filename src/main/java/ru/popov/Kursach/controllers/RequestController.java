package ru.popov.Kursach.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.popov.Kursach.models.Request;
import ru.popov.Kursach.service.RequestService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/request")
public class RequestController {
    private RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @GetMapping
    public List<Request> getAllRequests() {
        return requestService.getAllRequests();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Request>> getRequestById(@PathVariable int id) {
        Optional<Request> request = requestService.getRequestById(id);
        if (request.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(request);
    }

    @PostMapping("/addRequest")
    public ResponseEntity<Request> addRequest(@RequestBody Request request) {
        requestService.addRequest(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Request> updateRequest(@PathVariable int id, @RequestBody Request request) {
        requestService.updateRequest(id, request);
        return ResponseEntity.ok(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Request> deleteRequest(@PathVariable int id) {
        requestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }

}
