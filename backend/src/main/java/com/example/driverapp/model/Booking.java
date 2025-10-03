package com.example.driverapp.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String phone;
    private LocalDateTime pickupTime;
    private String service;
    private Integer durationHours; // nullable if not hourly

    // New fields for map-based location
    private Double pickupLat;
    private Double pickupLng;
    private String pickupAddress;
}
