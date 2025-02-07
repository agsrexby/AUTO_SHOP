package ru.popov.Kursach.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.popov.Kursach.models.Manager;
import ru.popov.Kursach.service.ManagerService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {
    private ManagerService managerService;

    public ManagerController(ManagerService managerService) {
        this.managerService = managerService;
    }

    @GetMapping
    public List<Manager> getAllManagers() {
        return managerService.getAllManagers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Manager>> getManagerById(@PathVariable int id) {
        Optional<Manager> manager = managerService.getManagerById(id);
        if (manager.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(manager);
    }

    @PostMapping("/addManager")
    public ResponseEntity<Manager> addManager(@RequestBody Manager manager) {
        managerService.addManager(manager);
        return ResponseEntity.status(HttpStatus.CREATED).body(manager);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Manager> updateManager(@PathVariable int id, @RequestBody Manager manager) {
        managerService.updateManager(id, manager);
        return ResponseEntity.ok(manager);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Manager> deleteManager(@PathVariable int id) {
        managerService.deleteManager(id);
        return ResponseEntity.noContent().build();
    }

}
