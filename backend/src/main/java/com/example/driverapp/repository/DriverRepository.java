package com.example.driverapp.repository;

import com.example.driverapp.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRepository extends JpaRepository<Driver, Long> {}
