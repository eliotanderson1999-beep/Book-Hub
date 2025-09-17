import React from "react";
import { Plus, Minus, X } from "lucide-react";

const Cart = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onClose,
}) => {
  const total = cartItems.reduce((sum, item) => {
    let price = 0;
    if (item.service === "rent") {
      price = item.rentPrice;
    } else {
      price = item.sellPrice;
    }
    return sum + price * item.cartQuantity;
  }, 0);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Shopping Cart</h2>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="modal-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.cartId} className="cart-item">
                  <div className="cart-item-info">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <div>
                      <h4>{item.name}</h4>
                      <p style={{ color: "#666", fontSize: "0.9rem" }}>
                        {item.author}
                      </p>
                      <div>
                        <span
                          className={`service-badge ${
                            item.service === "rent"
                              ? "rent-badge"
                              : "sell-badge"
                          }`}
                        >
                          {item.service === "rent" ? "RENT" : "BUY"}
                        </span>
                        {item.service === "rent" && (
                          <span
                            style={{
                              fontSize: "0.8rem",
                              color: "#888",
                              marginLeft: "0.5rem",
                            }}
                          >
                            ({item.rentDuration})
                          </span>
                        )}
                      </div>
                      <p style={{ color: "#2F5233", fontWeight: "bold" }}>
                        ₹
                        {item.service === "rent"
                          ? item.rentPrice
                          : item.sellPrice}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.cartId, item.cartQuantity - 1)
                        }
                        className="quantity-btn"
                      >
                        <Minus size={16} />
                      </button>
                      <span style={{ margin: "0 1rem", fontWeight: "bold" }}>
                        {item.cartQuantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.cartId, item.cartQuantity + 1)
                        }
                        className="quantity-btn"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.cartId)}
                      style={{
                        background: "#ff4444",
                        color: "white",
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginTop: "0.5rem",
                        width: "100%",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="cart-total">Total: ₹{total}</div>
              <button
                onClick={onCheckout}
                className="btn-primary"
                style={{ width: "100%" }}
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
