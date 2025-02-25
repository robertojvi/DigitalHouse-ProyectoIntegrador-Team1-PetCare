import React from "react";
import { PiWhatsappLogo } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { FaRegCopyright, FaTiktok, FaFacebook, FaInstagram } from "react-icons/fa";
import "../styles/Footer.css";
import petCareLogo from "../images/pet-care-logo-v2.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-logo-container">
          <img src={petCareLogo} alt="Pet Care Logo" className="footer-logo" />
        </div>
        <div className="footer-info">
          {/* Versión Desktop */}
          <div className="desktop-only">
            <div className="contact-info">
              <h4>
                HABLEMOS <PiWhatsappLogo />
              </h4>
              <p>Whatsapp: 57+ 111222333</p>
              <p>Email: info@outstanding11.com</p>
            </div>
            <div className="location-info">
              <h4>
                ENCUÉNTRANOS <IoLocationOutline />
              </h4>
              <p>Calle Digital House #10</p>
            </div>
          </div>

          {/* Versión Mobile */}
          <div className="mobile-only">
            <div className="mobile-info">
              <p className="info-item">
                <IoLocationOutline className="info-icon" />
                Calle Digital House #10
              </p>
              <p className="info-item">
                <PiWhatsappLogo className="info-icon" />
                57+ 111222333
              </p>
              <p className="info-item">
                <HiOutlineMail className="info-icon email-icon" />
                info@outstanding11.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>
          <div className="copyright-text">
            <FaRegCopyright style={{ 
              fontSize: '14px', 
              marginRight: '5px',
              color: '#ffffff'
            }} />
            <span className="desktop-only">{currentYear} </span>
            Todos los derechos reservados Outstanding11
          </div>
          <div className="social-icons">
            <FaTiktok style={{ 
              fontSize: '16px',
              color: '#685044',
              backgroundColor: '#ffffff',
              padding: '3px',
              borderRadius: '50%'
            }} />
            <FaFacebook style={{ 
              fontSize: '16px',
              color: '#685044',
              backgroundColor: '#ffffff',
              padding: '3px',
              borderRadius: '50%'
            }} />
            <FaInstagram style={{ 
              fontSize: '16px',
              color: '#685044',
              backgroundColor: '#ffffff',
              padding: '3px',
              borderRadius: '50%'
            }} />
          </div>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
