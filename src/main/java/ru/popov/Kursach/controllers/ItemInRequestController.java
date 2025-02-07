package ru.popov.Kursach.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.popov.Kursach.models.ItemInRequest;
import ru.popov.Kursach.service.ItemInRequestService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/item_in_request")
public class ItemInRequestController {
    private ItemInRequestService itemInRequestService;

    public ItemInRequestController(ItemInRequestService itemInRequestService) {
        this.itemInRequestService = itemInRequestService;
    }

    @GetMapping
    public List<ItemInRequest> getAllItemInRequests() {
        return itemInRequestService.getAllItemInRequests();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ItemInRequest>> getItemInRequestById(@PathVariable int id) {
        Optional<ItemInRequest> itemInRequest = itemInRequestService.getItemInRequestById(id);
        if (itemInRequest.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(itemInRequest);
    }

    @PostMapping("/addItemInRequest")
    public ResponseEntity<ItemInRequest> addItemInRequest(@RequestBody ItemInRequest itemInRequest) {
        itemInRequestService.addItemInRequest(itemInRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(itemInRequest);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemInRequest> updateItemInRequest(@PathVariable int id, @RequestBody ItemInRequest itemInRequest) {
        itemInRequestService.updateItemInRequest(id, itemInRequest);
        return ResponseEntity.ok(itemInRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ItemInRequest> deleteItemInRequest(@PathVariable int id) {
        itemInRequestService.deleteItemInRequest(id);
        return ResponseEntity.noContent().build();
    }

}
