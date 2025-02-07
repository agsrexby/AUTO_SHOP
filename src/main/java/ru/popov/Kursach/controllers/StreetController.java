package ru.popov.Kursach.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.popov.Kursach.models.Street;
import ru.popov.Kursach.service.StreetService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/street")
public class StreetController {
    public StreetService streetService;

    public StreetController(StreetService streetService) {
        this.streetService = streetService;
    }

    @GetMapping
    public List<Street> getAllStreets() {
        return streetService.getAllStreets();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Street>> getStreetById(@PathVariable int id) {
        Optional<Street> street = streetService.getStreetById(id);
        if (street.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(street);
    }

    @PostMapping("/addStreet")
    public ResponseEntity<Street> addStreet(@RequestBody Street street) {
        streetService.addStreet(street);
        return ResponseEntity.status(HttpStatus.CREATED).body(street);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Street> updateStreet(@PathVariable int id, @RequestBody Street street) {
        streetService.updateStreet(id, street);
        return ResponseEntity.ok(street);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Street> deleteRequest(@PathVariable int id) {
        streetService.deleteStreet(id);
        return ResponseEntity.noContent().build();
    }

}
