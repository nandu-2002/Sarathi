package com.example.driverapp.controller;

import com.example.driverapp.model.Booking;
import com.example.driverapp.repository.BookingRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    private final BookingRepository bookingRepo;

    public BookingController(BookingRepository bookingRepo) {
        this.bookingRepo = bookingRepo;
    }

    @GetMapping
    public List<Booking> getAll() {
        return bookingRepo.findAll();
    }

    @PostMapping
    public Booking create(@Valid @RequestBody Booking booking) {

        // Conditional validation
        if ("hourly".equalsIgnoreCase(booking.getService())
            && (booking.getDurationHours() == null || booking.getDurationHours() <= 0)) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Duration (hours) is required and must be > 0 for Hourly Driver"
            );
        }

        if (booking.getPickupLat() == null || booking.getPickupLng() == null) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Pickup location must be selected on the map"
            );
        }

        return bookingRepo.save(booking);
    }
}
