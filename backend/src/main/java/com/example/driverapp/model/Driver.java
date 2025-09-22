package com.example.driverapp.model;

import jakarta.persistence.*;

@Entity
public class Driver {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private int experience; // years
  private String licenseType;
  private double hourlyRate;

  public Long getId(){return id;} public void setId(Long id){this.id=id;}
  public String getName(){return name;} public void setName(String name){this.name=name;}
  public int getExperience(){return experience;} public void setExperience(int experience){this.experience=experience;}
  public String getLicenseType(){return licenseType;} public void setLicenseType(String licenseType){this.licenseType=licenseType;}
  public double getHourlyRate(){return hourlyRate;} public void setHourlyRate(double hourlyRate){this.hourlyRate=hourlyRate;}
}
