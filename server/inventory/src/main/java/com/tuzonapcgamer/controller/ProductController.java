package com.tuzonapcgamer.controller;

import com.tuzonapcgamer.model.InventoryItem;
import com.tuzonapcgamer.model.Product;
import com.tuzonapcgamer.service.facade.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://172.22.96.1:3000")
@RequestMapping("/product")
public class ProductController {
    @Autowired private ProductService service;

    @PostMapping
    public ResponseEntity<Product> add(@RequestBody Product object) {
        if(object.getId() != null)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(this.service.save(object));
    }

    @PutMapping
    public ResponseEntity<Product> save(@RequestBody Product object) {
        if(object.getId() == null)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(this.service.save(object));
    }

    @GetMapping("/inventory/id/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        return this.service.getById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAll() {
        List<Product> elements = service.getAll();
        return ResponseEntity.ok(elements);
    }

    @DeleteMapping("/inventory/id/{id}")
    public ResponseEntity<Product> deleteById(@PathVariable Long id) {
        this.service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
