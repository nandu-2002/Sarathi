import React, { useState, useEffect } from "react";
import "./ServicesCarousel.css";
import driver from "../assets/driver.png";
import driver1 from "../assets/driver1.png";
import outstation from "../assets/outstation.png";
import event from "../assets/event.png";
import night from "../assets/night.png";
import airport from "../assets/airport.png";

const ServicesCarousel = () => {
  const services = [
    { id: 1, title: "Hourly Driver", img: driver },
    { id: 2, title: "Full Day Driver", img: driver1 },
    { id: 3, title: "Outstation Travel", img: outstation },
    { id: 4, title: "Event Driver", img: event },
    { id: 5, title: "Night Shift", img: night },
    { id: 6, title: "Airport Pickup", img: airport },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % services.length);
    }, 3000); // change every 3 seconds
    return () => clearInterval(interval);
  }, [services.length]);

  const rotationDegree = 360 / services.length;

  return (
    <div className="carousel3d-section">
      <h2 className="carousel-title">Our Services</h2>
      <div className="carousel3d-wrapper">
        <div
          className="carousel3d"
          style={{ transform: `rotateY(${-current * rotationDegree}deg)` }}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className="carousel3d-card"
              style={{
                backgroundImage: `url(${service.img})`,
                transform: `rotateY(${index * rotationDegree}deg) translateZ(350px)`,
              }}
            >
              <div className="carousel3d-card-title">{service.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesCarousel;
