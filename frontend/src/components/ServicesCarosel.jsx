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
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);
  const startX = useRef(0);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const animationFrame = useRef(null);
  const rotationDegree = 360 / services.length;

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % services.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [services.length]);

  // ScrollReveal
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

  // Inertia animation
  const animateInertia = () => {
    if (Math.abs(velocity.current) < 0.01) {
      cancelAnimationFrame(animationFrame.current);
      velocity.current = 0;
      return;
    }
    setCurrent((prev) => {
      let next = prev + (velocity.current > 0 ? -1 : 1);
      if (next < 0) next = services.length - 1;
      if (next >= services.length) next = 0;
      return next;
    });
    velocity.current *= 0.95; // friction
    animationFrame.current = requestAnimationFrame(animateInertia);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    cancelAnimationFrame(animationFrame.current);
    startX.current = e.clientX || e.touches[0].clientX;
    lastX.current = startX.current;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX || e.touches[0].clientX;
    velocity.current = x - lastX.current;
    lastX.current = x;
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
    animationFrame.current = requestAnimationFrame(animateInertia);
  };

  return (
    <div className="carousel3d-section">
      <h2 className="carousel-title">
        OUR <span>SERVICES</span>
      </h2>

      <div
        className={`carousel3d-wrapper ${isDragging ? "dragging" : ""}`}
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => { if(isDragging) handleMouseUp(); }}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <div
          className={`carousel3d ${isDragging ? "dragging" : ""}`}
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

      {/* Dots */}
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
