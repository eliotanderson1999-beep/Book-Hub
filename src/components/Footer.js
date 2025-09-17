import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Book Hub</h4>
            <p>&copy; 2024 Book Hub. All rights reserved.</p>
            <p>Your trusted partner for books - Rent • Buy • Enjoy</p>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📞 +91 98765 43210</p>
            <p>✉️ info@bookhub.com</p>
            <p>📍 SLIET Longowal, Sangrur, Punjab, India</p>
          </div>

          <div className="footer-section">
            <h4>Rental Plans</h4>
            <p>• 1 Week Plans</p>
            <p>• 1 Month Plans</p>
            <p>• 2 Months Plans</p>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <p>• Book Rentals</p>
            <p>• Book Sales</p>
            <p>• Student Discounts</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Made with ❤️ for book lovers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
