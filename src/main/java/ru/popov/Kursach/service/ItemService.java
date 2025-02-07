package ru.popov.Kursach.service;

import org.springframework.stereotype.Service;
import ru.popov.Kursach.models.Item;
import ru.popov.Kursach.repositories.ItemRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    private ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Optional<Item> getItemById(int id) {
        return itemRepository.findById(id);
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public void addItem(Item item) {
        itemRepository.save(item);
    }

    public void updateItem(int id, Item item) {
        itemRepository.update(item,id);
    }

    public void deleteItem(int id) {
        itemRepository.deleteById(id);
    }

}
