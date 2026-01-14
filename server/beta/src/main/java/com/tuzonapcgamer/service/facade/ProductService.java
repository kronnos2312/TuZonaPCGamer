package com.tuzonapcgamer.service.facade;

import com.tuzonapcgamer.dto.ProductDTO;
import com.tuzonapcgamer.model.InventoryItem;
import com.tuzonapcgamer.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    Optional<Product> getById(Long id);

    List<Product> getAll();
    Product validateOrSave(ProductDTO product);
    Product save(Product product);

    void deleteById(Long id);

    // byHARD ResetSYSTEM
    void deleteAll();

}
