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
  const carouselRef = useRef(null);
  const startX = useRef(0);
  const rotationDegree = 360 / services.length;

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % services.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [services.length]);

  // ScrollReveal animation
  useEffect(() => {
    ScrollReveal().reveal(".carousel-title, .carousel3d-section", {
      duration: 1500,
      distance: "60px",
      easing: "ease-in-out",
      origin: "bottom",
      delay: 200,
      reset: false,
    });
  }, []);

  // Drag / Swipe Support
  const handleMouseDown = (e) => {
    startX.current = e.clientX || e.touches[0].clientX;
  };

  const handleMouseUp = (e) => {
    const endX = e.clientX || e.changedTouches[0].clientX;
    const diff = startX.current - endX;
    if (diff > 30) setCurrent((prev) => (prev + 1) % services.length);
    if (diff < -30) setCurrent((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <div className="carousel3d-section">
      <h2 className="carousel-title">
        OUR <span>SERVICES</span>
      </h2>
      <div
        className="carousel3d-wrapper"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
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
      {/* Indicator Dots */}
      <div className="carousel-dots">
        {services.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ServicesCarousel;
