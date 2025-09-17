import React, { useState } from "react";
import { ShoppingCart, Book, Menu, X } from "lucide-react";

const Navbar = ({ cartCount, onCartClick, currentPage, onPageChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handlePageChange = (page) => {
    onPageChange(page);
    setIsMobileMenuOpen(false); // Close menu after navigation
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <Book size={32} />
            <span>Book Hub</span>
          </div>

          {/* Desktop Navigation */}
          <ul className="navbar-nav desktop-nav">
            <li>
              <button
                onClick={() => onPageChange("home")}
                className={`nav-link ${currentPage === "home" ? "active" : ""}`}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => onPageChange("books")}
                className={`nav-link ${
                  currentPage === "books" ? "active" : ""
                }`}
              >
                Books
              </button>
            </li>
            <li>
              <button
                onClick={() => onPageChange("contact")}
                className={`nav-link ${
                  currentPage === "contact" ? "active" : ""
                }`}
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Mobile Navigation Controls */}
          <div className="mobile-nav-controls">
            <button onClick={onCartClick} className="cart-button">
              <ShoppingCart size={24} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            <button
              className="mobile-menu-button"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Cart Button */}
          <button onClick={onCartClick} className="cart-button desktop-cart">
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div className={`mobile-sidebar ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <Book size={24} />
              <span>Book Hub</span>
            </div>
            <button
              className="sidebar-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <ul className="sidebar-nav">
            <li>
              <button
                onClick={() => handlePageChange("home")}
                className={`sidebar-nav-link ${
                  currentPage === "home" ? "active" : ""
                }`}
              >
                🏠 Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePageChange("books")}
                className={`sidebar-nav-link ${
                  currentPage === "books" ? "active" : ""
                }`}
              >
                📚 Books
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePageChange("contact")}
                className={`sidebar-nav-link ${
                  currentPage === "contact" ? "active" : ""
                }`}
              >
                📞 Contact
              </button>
            </li>
          </ul>

          <div className="sidebar-footer">
            <div className="sidebar-info">
              <p>📱 +91 62833 28093</p>
              <p>📱 +91 82370 01972</p>
              <p>✉️ info@bookhub.com</p>
              <p>📍 SLIET Longowal, Sangrur, Punjab</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
