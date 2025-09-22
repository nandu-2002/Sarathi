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
    private String pickupLocation;
    private LocalDateTime pickupTime;

    private String service;   // <-- NEW field

    private Integer durationHours; // changed to Integer so it can be null
}
