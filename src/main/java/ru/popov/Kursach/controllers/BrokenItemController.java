package ru.popov.Kursach.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.popov.Kursach.models.BrokenItem;
import ru.popov.Kursach.service.BrokenItemService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/broken_item")
public class BrokenItemController {
    private BrokenItemService brokenItemService;

    public BrokenItemController(BrokenItemService brokenItemService) {
        this.brokenItemService = brokenItemService;
    }

    @GetMapping
    public List<BrokenItem> getAllBrokenItems() {
        return brokenItemService.getAllBrokenItems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<BrokenItem>> getBrokenItemById(@PathVariable int id) {
        Optional<BrokenItem> brokenItem = brokenItemService.getBrokenItemById(id);
        if (brokenItem.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(brokenItem);
    }

    @PostMapping("/addBrokenItem")
    public ResponseEntity<BrokenItem> addBrokenItem(@RequestBody BrokenItem brokenItem) {
        brokenItemService.addBrokenItem(brokenItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(brokenItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BrokenItem> updateBrokenItem(@PathVariable int id, @RequestBody BrokenItem brokenItem) {
        brokenItemService.updateBrokenItem(id, brokenItem);
        return ResponseEntity.ok(brokenItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BrokenItem> deleteBrokenItem(@PathVariable int id) {
        brokenItemService.deleteBrokenItem(id);
        return ResponseEntity.noContent().build();
    }
}
