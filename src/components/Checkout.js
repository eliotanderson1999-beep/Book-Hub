import React, { useState } from "react";
import { X } from "lucide-react";

const Checkout = ({ cartItems, onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    registrationNo: "",
    trade: "",
    hostel: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cartItems.reduce((sum, item) => {
    const price = item.service === "rent" ? item.rentPrice : item.sellPrice;
    return sum + price * item.cartQuantity;
  }, 0);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitToGoogleSheets = async (data) => {
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbxk1DBPjVRhbTUqyt-LodPYHcbmnOajwqiVcvW8BTK6k8MnOU6wOWpFHXYHxE8YNUGR/exec"; // Replace with your deployed script URL

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "checkout",
          ...data,
          cartItems: cartItems,
          total: total,
        }),
        mode: "no-cors", // Required for Google Apps Script
      });

      // Note: With no-cors, we can't read the response, but the request will be sent
      return { success: true };
    } catch (error) {
      console.error("Error submitting to Google Sheets:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.name &&
      formData.mobile &&
      formData.registrationNo &&
      formData.trade &&
      formData.hostel
    ) {
      setIsSubmitting(true);

      try {
        // Submit to Google Sheets
        await submitToGoogleSheets(formData);

        // Show success message
        alert(
          "Order placed successfully! You will receive confirmation shortly."
        );

        // Call the original onSubmit function
        onSubmit(formData, cartItems, total);

        // Reset form
        setFormData({
          name: "",
          mobile: "",
          registrationNo: "",
          trade: "",
          hostel: "",
        });
      } catch (error) {
        alert("There was an error placing your order. Please try again.");
        console.error("Error:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Please fill all required fields");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Checkout</h2>
          <button onClick={onBack} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="modal-content">
          <div style={{ marginBottom: "2rem" }}>
            <h3>Order Summary</h3>
            {cartItems.map((item) => (
              <div
                key={item.cartId}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span>
                  {item.name} ({item.service.toUpperCase()}) x{" "}
                  {item.cartQuantity}
                  {item.service === "rent" && (
                    <span style={{ fontSize: "0.8rem", color: "#888" }}>
                      {" "}
                      - {item.rentDuration}
                    </span>
                  )}
                </span>
                <span>
                  ₹
                  {(item.service === "rent" ? item.rentPrice : item.sellPrice) *
                    item.cartQuantity}
                </span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem 0",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mobile Number *</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="form-input"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Registration Number *</label>
              <input
                type="text"
                name="registrationNo"
                value={formData.registrationNo}
                onChange={handleInputChange}
                className="form-input"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Trade *</label>
              <input
                type="text"
                name="trade"
                value={formData.trade}
                onChange={handleInputChange}
                className="form-input"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Hostel *</label>
              <select
                name="hostel"
                value={formData.hostel}
                onChange={handleInputChange}
                className="form-select"
                required
                disabled={isSubmitting}
              >
                <option value="">Select Hostel</option>
                <option value="Boys Hostel 1">BH-01</option>
                <option value="Boys Hostel 2">BH-02</option>
                <option value="Boys Hostel 3">BH-03</option>
                <option value="Boys Hostel 4">BH-04</option>
                <option value="Boys Hostel 5">BH-05</option>
                <option value="Boys Hostel 6">BH-06</option>
                <option value="Boys Hostel 7">BH-07</option>
                <option value="Boys Hostel 8">BH-08</option>
                <option value="Boys Hostel 9">BH-09</option>
                <option value="Boys Hostel 10">BH-10</option>
                <option value="Girls Hostel 1">GH-01</option>
                <option value="Girls Hostel 2">GH-02</option>
                <option value="Girls Hostel 3">GH-03</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                type="button"
                onClick={onBack}
                className="btn-secondary"
                style={{ flex: 1 }}
                disabled={isSubmitting}
              >
                Back to Cart
              </button>
              <button
                type="submit"
                className="btn-primary"
                style={{ flex: 1 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
