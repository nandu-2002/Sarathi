import React, { useState } from "react";
import BookingForm from "./components/BookingForm";
import "./App.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import image2 from "./assets/image2.png";
import ServicesCarousel from "./components/ServicesCarosel";

function App() {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [bookingError, setBookingError] = useState("");

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
          <div
            className={`menu-toggle ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </div>
          <ul className={menuOpen ? "nav-links active" : "nav-links"}>
            {["home", "about", "services", "booking", "contact"].map((id) => (
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
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <h1>Welcome To Sarathi.</h1>
        <p>Book a professional driver for your vehicle anytime, anywhere.</p>
        <h2>Book your Ride By Click Here!</h2>
        <button
          className="glow-btn"
          onClick={() =>
            document.getElementById("booking").scrollIntoView({ behavior: "smooth" })
          }
        >
          Book Now
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="about-container">
        <div className="section about-section">
          <h2>ABOUT US</h2>
        <div className="about-content">
          <ul>
            <li>We connect customers with professional drivers.</li>
            <li>Whether you need a driver for a few hours or a full day, we make it simple and safe.</li>
          </ul>
          <div className="about-image">
            <img src={image2} alt="About us" />
          </div>
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
        <h2>Contact Us</h2>
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
