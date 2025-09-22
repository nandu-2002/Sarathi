package com.example.driverapp.controller;

import com.example.driverapp.model.Driver;
import com.example.driverapp.repository.DriverRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/drivers")
public class DriverController {
  private final DriverRepository repo;
  public DriverController(DriverRepository repo){this.repo = repo;}

  @GetMapping
  public List<Driver> getAll(){
    return repo.findAll();
  }
}
