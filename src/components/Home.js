import React from "react";
import { Clock, ShoppingBag, Book } from "lucide-react";

const Home = ({ onPageChange }) => {
  return (
    <div className="page-container">
      <div className="hero-section">
        <div className="container">
          <h1 className="hero-title">Welcome to Book Hub</h1>
          <p className="hero-subtitle">
            Your one-stop destination for books! Choose to rent books for
            short-term reading or buy them for your permanent collection.
            Flexible rental periods: 1 Week, 1 Month, or 2 Months!
          </p>
          <div className="hero-buttons">
            <button
              onClick={() => onPageChange("books")}
              className="btn-primary"
            >
              Browse Books
            </button>
            <button
              onClick={() => onPageChange("contact")}
              className="btn-secondary"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              marginBottom: "1rem",
            }}
          >
            Why Choose Book Hub?
          </h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Clock size={32} />
              </div>
              <h3>Flexible Rental</h3>
              <p>
                Choose from 1 Week, 1 Month, or 2 Months rental periods. Perfect
                for quick reads, semester studies, or extended reading.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <ShoppingBag size={32} />
              </div>
              <h3>Buy Books</h3>
              <p>
                Purchase books to build your permanent library. Own your
                favorite titles forever at competitive prices.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Book size={32} />
              </div>
              <h3>Vast Collection</h3>
              <p>
                From fiction to technical books, academic texts to novels. We
                have something for every reader and every need.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rental Plans Section */}
      <div className="rental-plans-section">
        <div className="container">
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              marginBottom: "2rem",
            }}
          >
            Rental Plans
          </h2>
          <div className="plans-grid">
            <div className="plan-card">
              <div className="plan-header">
                <h3>1 Week Plan</h3>
                <Clock size={24} />
              </div>
              <p className="plan-description">
                Perfect for quick reads and assignments
              </p>
              <div className="plan-features">
                <span>✓ 7 Days rental</span>
                <span>✓ Lowest cost option</span>
                <span>✓ Ideal for short books</span>
              </div>
            </div>

            <div className="plan-card popular">
              <div className="plan-header">
                <h3>1 Month Plan</h3>
                <Clock size={24} />
              </div>
              <div className="popular-badge">Most Popular</div>
              <p className="plan-description">Best value for regular readers</p>
              <div className="plan-features">
                <span>✓ 30 Days rental</span>
                <span>✓ Best value for money</span>
                <span>✓ Perfect for novels</span>
              </div>
            </div>

            <div className="plan-card">
              <div className="plan-header">
                <h3>2 Months Plan</h3>
                <Clock size={24} />
              </div>
              <p className="plan-description">
                Extended reading for comprehensive study
              </p>
              <div className="plan-features">
                <span>✓ 60 Days rental</span>
                <span>✓ Extended study time</span>
                <span>✓ Great for academic books</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
