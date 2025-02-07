package ru.popov.Kursach.service;

import org.springframework.stereotype.Service;
import ru.popov.Kursach.models.ItemInRequest;
import ru.popov.Kursach.repositories.ItemInRequestRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ItemInRequestService {
    private ItemInRequestRepository itemInRequestRepository;

    public ItemInRequestService(ItemInRequestRepository itemInRequestRepository) {
        this.itemInRequestRepository = itemInRequestRepository;
    }

    public Optional<ItemInRequest> getItemInRequestById(int id) {
        return itemInRequestRepository.findById(id);
    }

    public List<ItemInRequest> getAllItemInRequests() {
        return itemInRequestRepository.findAll();
    }

    public void addItemInRequest(ItemInRequest itemInRequest) {
        itemInRequestRepository.save(itemInRequest);
    }

    public void updateItemInRequest(int id, ItemInRequest itemInRequest) {
       itemInRequestRepository.update(itemInRequest,id);
    }

    public void deleteItemInRequest(int id) {
        itemInRequestRepository.deleteById(id);
    }

}
