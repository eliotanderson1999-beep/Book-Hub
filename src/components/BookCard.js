import React, { useState } from "react";
import { Star, Clock, ShoppingBag } from "lucide-react";

const BookCard = ({ book, onAddToCart }) => {
  const [selectedOption, setSelectedOption] = useState(
    book.availableFor.includes("rent") ? "rent" : "sell"
  );
  const [selectedRentPeriod, setSelectedRentPeriod] = useState("1week");

  return (
    <div className="book-card">
      <img src={book.image} alt={book.name} className="book-image" />
      <div className="book-info">
        <h3 className="book-title">{book.name}</h3>
        <p className="book-author">by {book.author}</p>

        <div className="price-section">
          <div className="service-options">
            {/* Rent Option */}
            {book.availableFor.includes("rent") && book.rentOptions && (
              <div
                className={`service-option ${
                  selectedOption === "rent" ? "active" : ""
                } ${book.quantity === 0 ? "disabled" : ""}`}
                onClick={() => book.quantity > 0 && setSelectedOption("rent")}
              >
                <div className="service-header">
                  <Clock size={14} />
                  <span className="service-label">Rent</span>
                </div>

                {selectedOption === "rent" && (
                  <div className="rent-periods">
                    {Object.entries(book.rentOptions).map(
                      ([period, details]) => (
                        <div
                          key={period}
                          className={`rent-period ${
                            selectedRentPeriod === period ? "selected" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRentPeriod(period);
                          }}
                        >
                          <span className="period-duration">
                            {details.duration}
                          </span>
                          <span className="period-price">₹{details.price}</span>
                        </div>
                      )
                    )}
                  </div>
                )}

                {selectedOption !== "rent" && (
                  <div className="price-preview">
                    <span className="price-from">
                      From ₹{book.rentOptions["1week"].price}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Sell Option */}
            {book.availableFor.includes("sell") && book.sellPrice > 0 && (
              <div
                className={`service-option ${
                  selectedOption === "sell" ? "active" : ""
                } ${book.quantity === 0 ? "disabled" : ""}`}
                onClick={() => book.quantity > 0 && setSelectedOption("sell")}
              >
                <div className="service-header">
                  <ShoppingBag size={14} />
                  <span className="service-label">Buy</span>
                </div>
                <div className="price-value">₹{book.sellPrice}</div>
              </div>
            )}
          </div>
        </div>

        <div className="rating">
          <Star size={16} fill="#ffd700" color="#ffd700" />
          <span>4.5</span>
        </div>

        {book.quantity > 0 ? (
          <div className="action-buttons">
            {selectedOption === "rent" &&
              book.availableFor.includes("rent") && (
                <button
                  onClick={() => onAddToCart(book, "rent", selectedRentPeriod)}
                  className="action-btn rent-btn"
                >
                  <Clock size={16} />
                  Rent - {book.rentOptions[selectedRentPeriod].duration}
                </button>
              )}

            {selectedOption === "sell" &&
              book.availableFor.includes("sell") && (
                <button
                  onClick={() => onAddToCart(book, "sell")}
                  className="action-btn sell-btn"
                >
                  <ShoppingBag size={16} />
                  Buy Book
                </button>
              )}
          </div>
        ) : (
          <button disabled className="action-btn sold-out-btn">
            Sold Out
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
