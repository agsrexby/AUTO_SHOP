package ru.popov.Kursach.service;

import org.springframework.stereotype.Service;
import ru.popov.Kursach.models.ItemInOrder;
import ru.popov.Kursach.repositories.ItemInOrderRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ItemInOrderService {
    private ItemInOrderRepository itemInOrderRepository;

    public ItemInOrderService(ItemInOrderRepository itemInOrderRepository) {
        this.itemInOrderRepository = itemInOrderRepository;
    }

    public Optional<ItemInOrder> getItemInOrderById(int id) {
        return itemInOrderRepository.findById(id);
    }

    public List<ItemInOrder> getAllItemInOrders() {
        return itemInOrderRepository.findAll();
    }

    public void addItemInOrder(ItemInOrder itemInOrder) {
        itemInOrderRepository.save(itemInOrder);
    }

    public void updateItemInOrder(int id, ItemInOrder itemInOrder) {
       itemInOrderRepository.update(itemInOrder,id);
    }

    public void deleteItemInOrder(int id) {
        itemInOrderRepository.deleteById(id);
    }

}
