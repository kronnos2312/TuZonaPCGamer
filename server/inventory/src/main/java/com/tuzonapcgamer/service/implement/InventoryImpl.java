package com.tuzonapcgamer.service.implement;

import com.tuzonapcgamer.model.InventoryItem;
import com.tuzonapcgamer.repository.InventoryItemREP;
import com.tuzonapcgamer.service.facade.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class InventoryImpl implements InventoryService {

    @Autowired private InventoryItemREP repository;

    @Override
    public List<InventoryItem> getAll() {
        return repository.findAll();
    }

    @Override
    public List<InventoryItem> getdAllByYear(Date date) {
        return repository.findByArrivalTime(date);
    }

    @Override
    public Optional<InventoryItem> getById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Optional<InventoryItem> getByBarCode(String name) {
        return repository.findByBarCode(name);
    }

    @Override
    public InventoryItem save(InventoryItem manufacturer) {
        if( manufacturer.getId() != 0){
            return repository.save(manufacturer);
        }
        return createInventoryItem(manufacturer);
    }

    private InventoryItem createInventoryItem(InventoryItem manufacturer){
        manufacturer.setId(null);
        if( manufacturer.getProduct().getId() == 0){
            manufacturer.getProduct().setId(null);
        }

        return repository.save(manufacturer);
    }


    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        repository.deleteAll();
    }
}
