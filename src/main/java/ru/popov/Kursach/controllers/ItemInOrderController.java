package ru.popov.Kursach.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.popov.Kursach.models.ItemInOrder;
import ru.popov.Kursach.service.ItemInOrderService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/item_in_order")
public class ItemInOrderController {
    private ItemInOrderService itemInOrderService;

    public ItemInOrderController(ItemInOrderService itemInOrderService) {
        this.itemInOrderService = itemInOrderService;
    }

    @GetMapping
    public List<ItemInOrder> getAllItemInOrders() {
        return itemInOrderService.getAllItemInOrders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ItemInOrder>> getItemInOrderById(@PathVariable int id) {
        Optional<ItemInOrder> itemInOrder = itemInOrderService.getItemInOrderById(id);
        if (itemInOrder.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(itemInOrder);
    }

    @PostMapping("/addItemInOrder")
    public ResponseEntity<ItemInOrder> addItemInOrder(@RequestBody ItemInOrder itemInOrder) {
        itemInOrderService.addItemInOrder(itemInOrder);
        return ResponseEntity.status(HttpStatus.CREATED).body(itemInOrder);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemInOrder> updateItemInOrder(@PathVariable int id, @RequestBody ItemInOrder itemInOrder) {
        itemInOrderService.updateItemInOrder(id, itemInOrder);
        return ResponseEntity.ok(itemInOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ItemInOrder> deleteItemInOrder(@PathVariable int id) {
        itemInOrderService.deleteItemInOrder(id);
        return ResponseEntity.noContent().build();
    }

}
