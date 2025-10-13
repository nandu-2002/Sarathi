import React, { useState, useEffect, useRef } from "react";
import "./ServicesCarousel.css";
import driver from "../assets/driver.png";
import driver1 from "../assets/driver1.png";
import outstation from "../assets/outstation.png";
import event from "../assets/event.png";
import night from "../assets/night.png";
import airport from "../assets/airport.png";
import ScrollReveal from "scrollreveal";

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
  const intervalRef = useRef(null);
  const rotationDegree = 360 / services.length;

  // Auto-rotate carousel
  useEffect(() => {
    startAutoRotate();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startAutoRotate = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % services.length);
    }, 3000);
  };

  // ScrollReveal animation
  useEffect(() => {
    ScrollReveal().reveal(".carousel-title, .carousel3d-section", {
      duration: 2000,
      distance: "80px",
      easing: "ease-in-out",
      origin: "bottom",
      delay: 200,
      reset: false,
    });
  }, []);

  return (
    <div className="carousel3d-section">
      <h2 className="carousel-title">
        OUR <span>SERVICES</span>
      </h2>
      <div
        className="carousel3d-wrapper"
        onMouseEnter={() => {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }}
        onMouseLeave={() => startAutoRotate()}
      >
        <div
          className="carousel3d"
          style={{ transform: `rotateY(${-current * rotationDegree}deg)` }}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className="carousel3d-card"
              style={{
                "--y": `${index * rotationDegree}deg`,
                backgroundImage: `url(${service.img})`,
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
