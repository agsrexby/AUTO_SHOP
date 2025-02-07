package ru.popov.Kursach.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.popov.Kursach.models.Manufacturer;
import ru.popov.Kursach.service.ManufacturerService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/manufacturer")
public class ManufacturerController {
    private ManufacturerService manufacturerService;

    public ManufacturerController(ManufacturerService manufacturerService) {
        this.manufacturerService = manufacturerService;
    }

    @GetMapping
    public List<Manufacturer> getAllManufacturers() {
        return manufacturerService.getAllManufacturers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Manufacturer>> getManufacturerById(@PathVariable int id) {
        Optional<Manufacturer> manufacturer = manufacturerService.getManufacturerById(id);
        if (manufacturer.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(manufacturer);
    }

    @PostMapping("/addManufacturer")
    public ResponseEntity<Manufacturer> addManufacturer(@RequestBody Manufacturer manufacturer) {
        manufacturerService.addManufacturer(manufacturer);
        return ResponseEntity.status(HttpStatus.CREATED).body(manufacturer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Manufacturer> updateManufacturer(@PathVariable int id, @RequestBody Manufacturer manufacturer) {
        manufacturerService.updateManufacturer(id, manufacturer);
        return ResponseEntity.ok(manufacturer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Manufacturer> deleteManufacturer(@PathVariable int id) {
        manufacturerService.deleteManufacturer(id);
        return ResponseEntity.noContent().build();
    }

}
