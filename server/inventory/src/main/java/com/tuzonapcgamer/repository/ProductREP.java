package com.tuzonapcgamer.repository;

import com.tuzonapcgamer.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductREP extends JpaRepository<Product, Long> {
}
