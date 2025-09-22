package com.example.driverapp.controller;

import com.example.driverapp.model.Booking;
import com.example.driverapp.repository.BookingRepository;
import org.springframework.web.bind.annotation.*;

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
    public Booking create(@RequestBody Booking booking) {
        return bookingRepo.save(booking);
    }
}
