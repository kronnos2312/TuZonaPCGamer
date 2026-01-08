package com.tuzonapcgamer.controller;

import com.tuzonapcgamer.dto.ProductDTO;
import com.tuzonapcgamer.dto.WInventory;
import com.tuzonapcgamer.dto.nventoryDTO;
import com.tuzonapcgamer.model.InventoryItem;
import com.tuzonapcgamer.model.Product;
import com.tuzonapcgamer.repository.ProductREP;
import com.tuzonapcgamer.service.facade.InventoryService;
import com.tuzonapcgamer.service.facade.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http:/localhost:3000")
@RequestMapping("/inventory")
public class InventoryController {

    @Autowired private InventoryService service;
    @Autowired private ProductService productService;
    @PostMapping
    public ResponseEntity<InventoryItem> add(@RequestBody InventoryItem object) {
        if(object.getId() != null)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(this.service.save(object));
    }

    @PutMapping
    public ResponseEntity<InventoryItem> save(@RequestBody InventoryItem object) {
        if(object.getId() == null)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(this.service.save(object));
    }
    @PostMapping("/out")
    public ResponseEntity<WInventory> saveDTO(@RequestBody WInventory object) {
        return ResponseEntity.ok(this.service.SaveOUT(object));
    }

    @PostMapping("/dto")
    public ResponseEntity<InventoryItem> saveDTO(@RequestBody nventoryDTO object) {
        Product keep = productService.validateOrSave(object.getProduct());
        InventoryItem casted = object.cast();
        casted.setProduct(keep);
        return ResponseEntity.ok(this.service.save(casted));
    }

    @GetMapping("/inventory/id/{id}")
    public ResponseEntity<InventoryItem> getById(@PathVariable Long id) {
        return this.service.getById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/inventory/code/{code}")
    public ResponseEntity<InventoryItem> getByCode(@PathVariable String code) {
        return this.service.getByBarCode(code).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/inventory/entry/{date}")
    public ResponseEntity<List<InventoryItem>> getByCode(@PathVariable Date date) {
        List<InventoryItem> elements = this.service.getdAllByYear(date);
        return ResponseEntity.ok(elements);
    }


    @GetMapping
    public ResponseEntity<List<InventoryItem>> getAll() {
        List<InventoryItem> elements = service.getAll();
        return ResponseEntity.ok(elements);
    }

    @DeleteMapping("/inventory/id/{id}")
    public ResponseEntity<InventoryItem> deleteById(@PathVariable Long id) {
        this.service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
