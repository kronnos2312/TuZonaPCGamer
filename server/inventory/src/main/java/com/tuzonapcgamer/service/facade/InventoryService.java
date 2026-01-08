package com.tuzonapcgamer.service.facade;

import com.tuzonapcgamer.dto.WInventory;
import com.tuzonapcgamer.model.InventoryItem;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface InventoryService {

    List<InventoryItem> getAll();
    List<InventoryItem> getAll(Pageable pageable);

    List<InventoryItem> getdAllByYear(Date date);

    Optional<InventoryItem> getById(Long id);
    Optional<InventoryItem> getByBarCode(String name);

    InventoryItem save(InventoryItem manufacturer);
    WInventory SaveOUT(WInventory wInventory);

    void deleteById(Long id);

    // byHARD ResetSYSTEM
    void deleteAll();
}
