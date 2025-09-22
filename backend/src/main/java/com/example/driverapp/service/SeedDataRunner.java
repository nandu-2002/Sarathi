package com.example.driverapp.service;

import com.example.driverapp.model.Driver;
import com.example.driverapp.repository.DriverRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SeedDataRunner implements CommandLineRunner {
  private final DriverRepository driverRepo;
  public SeedDataRunner(DriverRepository driverRepo){this.driverRepo = driverRepo;}

  @Override
  public void run(String... args) throws Exception {
    if(driverRepo.count()==0){
      Driver d1 = new Driver(); d1.setName("Ramesh"); d1.setExperience(5); d1.setLicenseType("LMV"); d1.setHourlyRate(200);
      Driver d2 = new Driver(); d2.setName("Suresh"); d2.setExperience(8); d2.setLicenseType("LMV"); d2.setHourlyRate(250);
      Driver d3 = new Driver(); d3.setName("Anita"); d3.setExperience(3); d3.setLicenseType("LMV"); d3.setHourlyRate(180);
      driverRepo.save(d1); driverRepo.save(d2); driverRepo.save(d3);
    }
  }
}
