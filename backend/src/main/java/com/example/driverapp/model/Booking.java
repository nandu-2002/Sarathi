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
    private int durationHours;

    // Removed driverId for now (you can add relation later)
}
