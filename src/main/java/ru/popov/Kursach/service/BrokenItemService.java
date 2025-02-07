package ru.popov.Kursach.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.popov.Kursach.models.BrokenItem;
import ru.popov.Kursach.models.Country;
import ru.popov.Kursach.repositories.BrokenItemRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BrokenItemService {
    private BrokenItemRepository brokenItemRepository;

    public BrokenItemService(BrokenItemRepository brokenItemRepository) {
        this.brokenItemRepository = brokenItemRepository;
    }

    public Optional<BrokenItem> getBrokenItemById(int id) {
        return brokenItemRepository.findById(id);
    }

    public List<BrokenItem> getAllBrokenItems() {
        return brokenItemRepository.findAll();
    }

    public void addBrokenItem(BrokenItem brokenItem) {
        brokenItemRepository.save(brokenItem);
    }

    public void updateBrokenItem(int id, BrokenItem brokenItem) {
        brokenItemRepository.update(brokenItem,id);
    }

    public void deleteBrokenItem(int id) {
        brokenItemRepository.deleteById(id);
    }

}
