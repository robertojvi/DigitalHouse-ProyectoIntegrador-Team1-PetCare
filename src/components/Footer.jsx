import React from "react";
import Logo from "./header/Logo";
import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-logo-container">
          <img
            src="/src/images/pet-care-logo-v2.png"
            alt="Pet Care Logo"
            className="footer-logo"
          />
        </div>
        <div className="footer-info">
          <div className="contact-info">
            <h4>HABLEMOS</h4>
            <p>Whatsapp: 57+ 111222333</p>
            <p>Email: info@outstanding11.com</p>
          </div>
          <div className="location-info">
            <h4>ENCUÉNTRANOS</h4>
            <p>Calle Digital House #10</p>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>© {currentYear} Todos los derechos reservados Outstanding11</p>
      </div>
    </footer>
  );
};

export default Footer;
