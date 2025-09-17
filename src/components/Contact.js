import React, { useState } from "react";
import { Phone, Mail } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    hostel: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          formType: "contact",
          ...data,
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

    if (formData.name && formData.email && formData.message) {
      setIsSubmitting(true);

      try {
        // Submit to Google Sheets
        await submitToGoogleSheets(formData);

        // Show success message
        alert("Message sent successfully! We will get back to you soon.");

        // Reset form
        setFormData({
          name: "",
          email: "",
          mobile: "",
          hostel: "",
          message: "",
        });
      } catch (error) {
        alert("There was an error sending your message. Please try again.");
        console.error("Error:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Please fill all required fields");
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="contact-section">
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              marginBottom: "2rem",
            }}
          >
            Contact Book Hub
          </h2>

          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <Phone size={24} />
              </div>
              <div>
                <h4>Phone</h4>
                <p>+91 98765 43210</p>
                <p>+91 87654 32109</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <Mail size={24} />
              </div>
              <div>
                <h4>Email</h4>
                <p>info@bookhub.com</p>
                <p>support@bookhub.com</p>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: "1rem" }}>Get in Touch</h3>
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
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Hostel</label>
                <select
                  name="hostel"
                  value={formData.hostel}
                  onChange={handleInputChange}
                  className="form-select"
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

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-input"
                  rows="5"
                  style={{ resize: "vertical" }}
                  required
                  placeholder="Message if you want to rent your books or sell them"
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
