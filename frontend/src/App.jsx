import React, { useEffect, useRef, useState } from "react";
import BookingForm from "./components/BookingForm";
import "./App.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import image2 from "./assets/image2.png";
import ServicesCarousel from "./components/ServicesCarosel";
import ScrollReveal from "scrollreveal";
import Typed from "typed.js";
import anime from "animejs/lib/anime.es.js";
import 'boxicons/css/boxicons.min.css';


import bg1 from "../src/assets/nghttrafficphoto.png";
import bg2 from "../src/assets/citynight.png";

import bg3 from "../src/assets/driverbg.png";

const backgrounds = [bg1, bg2, bg3];

function App() {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [bookingError, setBookingError] = useState("");

  const [activeSection, setActiveSection] = useState('home');


   const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const offsetYRef = useRef(0);
  const requestRef = useRef();

  // Fade & background swap
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
        setFade(true);
      }, 400); // match CSS fade duration
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Smooth parallax using requestAnimationFrame
  useEffect(() => {
    let targetY = 0;

    const handleScroll = () => {
      targetY = window.scrollY * 0.5; // parallax multiplier
    };

    const animate = () => {
      offsetYRef.current += (targetY - offsetYRef.current) * 0.1; // smooth lerp
      document.querySelector(".hero-bg").style.transform = `translateY(${offsetYRef.current}px)`;
      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll);
    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);



  useEffect(() => {
    const typed = new Typed('.multiple-text', {
      strings: [
        "Sarathi — Your Personal Driver Partner",
        "Book Reliable Drivers Anytime, Anywhere",
        "Safe, Comfortable, and Hassle-Free Rides",
        "Experience the Smart Way to Travel"
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });


  const footerTyped= new Typed(".footer-typed", {
  strings: [
    '" Drive Safe. Drive Smart. "',
    '" Sarathi – Your Journey, Our Responsibility. "'
  ],
  typeSpeed: 80,
  backSpeed: 40,
  backDelay: 2000,
  loop: true,
  showCursor: false
});


    ScrollReveal().reveal('.home-content ,.about-heading, .contact-heading ,.contact-section h1' ,{ duration: 2000, distance: '80px', easing: 'ease-in-out', origin: 'top', delay:200, reset: false });
    ScrollReveal().reveal(".reveal-text", {
      duration: 1200,
      distance: "40px",
      origin: "bottom",
      easing: "ease-out",
      opacity: 0,
      interval: 700, 
      reset: false,  
    });
    ScrollReveal().reveal('.about-image', { duration: 2000, distance: '60px', easing: 'ease-in-out', origin: 'right', delay:200, reset: false });
    ScrollReveal().reveal('.phone-card', { duration: 2000, distance: '60px', easing: 'ease-in-out', origin: 'right', delay:200, reset: true });
    ScrollReveal().reveal(' .email-card', { duration: 2000, distance: '60px', easing: 'ease-in-out', origin: 'left', delay:200, reset: true });
    

     return () => {
      typed.destroy();
      footerTyped.destroy();
    };
    
  },[]);
 
 useEffect(() => {
    const textWrapper = document.querySelector(".ml13");
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    anime.timeline({ loop: true })
      .add({
        targets: ".ml13 .letter",
        translateY: [100, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 2400,
        delay: (el, i) => 300 + 30 * i,
      })
      .add({
        targets: ".ml13 .letter",
        translateY: [0, -100],
        opacity: [1, 0],
        easing: "easeInExpo",
        duration: 2200,
        delay: (el, i) => 100 + 30 * i,
      });
  }, []);


  useEffect(() => {
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
      const scrollY = window.pageYOffset;

      // Active link
      sections.forEach(sec => {
        const offsetTop = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollY >= offsetTop && scrollY < offsetTop + height) {
          setActiveSection(id);
        }
      });

    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



const handleBooking = async (form) => {
  setBookingError(""); // reset previous errors
  try {
    const response = await fetch("http://localhost:8080/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      setBookingError(data?.message || "Booking failed, please check your input!");
      return;
    }

    setBookingSuccess(true);
    setBookingError(""); // clear any previous error

    setTimeout(() => setBookingSuccess(false), 3000);
  } catch (error) {
    console.error("Booking error:", error);
    setBookingError("Network error! Please try again later.");
  }
};



  return (
    <div className="app-container">
      {/* Navbar */}
      <header className="top">
        <div className="logo">Sarathi</div>
        <nav className="navbar">
         
          <div className={`menu-toggle ${menuOpen ? "open" : ""}`}>
            <i
        id="menu-icon"
        className={`bx ${menuOpen ? 'bx-x' : 'bx-menu'}`}
        onClick={() => setMenuOpen(!menuOpen)}
      ></i>
          </div>
          <ul className={menuOpen ? "nav-links active" : "nav-links"}>
            {["home", "about", "services", "booking", "contact"].map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={activeSection === id ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
                    setMenuOpen(false);
                  }}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
     <section id="home" className="hero">
      <div
        className={`hero-bg ${fade ? "fade-in" : "fade-out"}`}
        style={{
          backgroundImage: `url(${backgrounds[currentIndex]})`,
        }}
      ></div>

      <div className="home-content">
        <h1>
          Welcome To <span className="ml13">Sarathi!</span>
        </h1>
        <p>
          <span className="multiple-text"></span>
        </p>
        <h2>Book your Ride By Click Here!</h2>
        <button
          className="glow-btn"
          onClick={() =>
            document
              .getElementById("booking")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          Book Now
        </button>
      </div>
    </section>

      {/* About Section */}
      <section id="about" className=" about-section">
          <h2 className="about-heading">ABOUT <span>US</span></h2>
        <div className="about-content">
          <ul> 
            <li className="reveal-text">
              Sarathi is a platform that connects customers with reliable, professional drivers — for their own vehicles. 
              We understand that not everyone needs to rent a car; sometimes, all you need is a skilled driver who can take 
              you safely to your destination. Whether it’s a daily commute, a business trip, or a late-night return, 
              Sarathi makes it simple to find and book trusted drivers in just a few clicks.
            </li>
            <li className="reveal-text">
              Whether you need a driver for a few hours or a full day, we make it simple and safe.
            </li>
            <li className="reveal-text">
              Our mission is to make travel convenient, safe, and affordable by empowering customers to use their 
              own vehicles more flexibly. Every driver in our network is verified, experienced, and trained to provide a courteous, 
              professional service. With Sarathi, your journey becomes stress-free — you enjoy the ride, we take care of the driving.
            </li>
          </ul>
          <div className="about-image">
            <img src={image2} alt="About us" />
          </div>
        </div>   
      </section>

      {/* Services Section */}
      <section id="services" className="section">
        <ServicesCarousel />
      </section>

      {/* Booking Form */}
      <section id="booking" className="booking-section">
  <BookingForm onSubmit={handleBooking} />
  
  {bookingSuccess && <p className="success-msg">✅ Booking confirmed successfully!</p>}
  {bookingError && <p className="error-msg">❌ {bookingError}</p>}
</section>


      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <h2 className="contact-heading">CONTACT <span>US</span></h2>
        <h1>Connect With Us For <span>Booking!</span></h1>
        <div className="contact-cards">
          <div className="contact-card email-card">
            <a href="mailto:support@driverondemand.com">
              <div className="contact-content">
                <p>support@driverondemand.com</p>
              </div>
            </a>
          </div>
          <div className="contact-card phone-card">
            <a href="tel:+919876543210">
              <div className="contact-content">
                <p>+91-9876543210</p>
              </div>
            </a>
          </div>
        </div>
        <h3><span className="footer-typed"></span></h3>

      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-content">
          <div>
            <div className="heading">BUSINESS TIME</div>
            <p className="list">24/7 Service</p>
          </div>
          <div>
            <div className="heading">QUICK ACCESS</div>
            <ul className="foot-links">
              {["home", "services", "about", "booking", "contact"].map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(id).scrollIntoView({ behavior: "smooth" });
                      setMenuOpen(false);
                    }}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="heading">CONTACT</div>
            <p>Email: support@driverondemand.com</p>
            <p>Phone: +91-9876543210</p>
          </div>
          <div>
            <div className="heading">FOLLOW US</div>
            <div className="icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookIcon />
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 DriverOnDemand. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
