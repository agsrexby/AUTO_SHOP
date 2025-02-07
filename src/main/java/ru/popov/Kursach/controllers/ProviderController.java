package ru.popov.Kursach.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.popov.Kursach.models.Provider;
import ru.popov.Kursach.service.ProviderService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/provider")
public class ProviderController {
    private ProviderService providerService;

    public ProviderController(ProviderService providerService) {
        this.providerService = providerService;
    }

    @GetMapping
    public List<Provider> getAllProviders() {
        return providerService.getAllProviders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Provider>> getProviderById(@PathVariable int id) {
        Optional<Provider> provider = providerService.getProviderById(id);
        if (provider.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(provider);
    }

    @PostMapping("/addProvider")
    public ResponseEntity<Provider> addProvider(@RequestBody Provider provider) {
        providerService.addProvider(provider);
        return ResponseEntity.status(HttpStatus.CREATED).body(provider);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Provider> updateProvider(@PathVariable int id, @RequestBody Provider provider) {
        providerService.updateProvider(id, provider);
        return ResponseEntity.ok(provider);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Provider> deleteProvider(@PathVariable int id) {
        providerService.deleteProvider(id);
        return ResponseEntity.noContent().build();
    }

}
