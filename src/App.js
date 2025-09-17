import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Books from "./components/Books";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { booksData } from "./data/booksData";
import "./styles/main.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [books, setBooks] = useState(booksData);

  const addToCart = (book, service, rentPeriod = null) => {
    // Create unique cart ID based on book, service, and rent period
    const cartId = rentPeriod
      ? `${book.id}-${service}-${rentPeriod}`
      : `${book.id}-${service}`;

    const existingItem = cartItems.find((item) => item.cartId === cartId);

    if (existingItem) {
      // Update quantity if item already exists
      setCartItems(
        cartItems.map((item) =>
          item.cartId === cartId
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        )
      );
    } else {
      // Add new item to cart
      let newItem = {
        ...book,
        service,
        cartQuantity: 1,
        cartId,
      };

      if (service === "rent" && rentPeriod && book.rentOptions) {
        newItem.rentPrice = book.rentOptions[rentPeriod].price;
        newItem.rentDuration = book.rentOptions[rentPeriod].duration;
        newItem.rentPeriod = rentPeriod;
      }

      setCartItems([...cartItems, newItem]);
    }

    // Show success message
    const serviceName = service === "rent" ? "rental" : "purchase";
    alert(`Book added to cart for ${serviceName}!`);
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }

    setCartItems(
      cartItems.map((item) =>
        item.cartId === cartId ? { ...item, cartQuantity: quantity } : item
      )
    );
  };

  const removeFromCart = (cartId) => {
    setCartItems(cartItems.filter((item) => item.cartId !== cartId));
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleOrderSubmit = async (formData, orderItems, total) => {
    // Prepare order data for Google Sheets
    const orderData = {
      customer: formData,
      items: orderItems.map((item) => ({
        bookId: item.id,
        name: item.name,
        author: item.author,
        service: item.service,
        price: item.service === "rent" ? item.rentPrice : item.sellPrice,
        quantity: item.cartQuantity,
        duration: item.service === "rent" ? item.rentDuration : null,
        rentPeriod: item.service === "rent" ? item.rentPeriod : null,
      })),
      total: total,
      orderDate: new Date().toISOString(),
      orderType: "Book Hub Order",
    };

    console.log("Order Data for Google Sheets:", orderData);

    try {
      // Here you would normally send to Google Sheets
      // await sendToGoogleSheets(orderData);

      // Update book quantities (simulate inventory management)
      const updatedBooks = books.map((book) => {
        const orderItem = orderItems.find((item) => item.id === book.id);
        if (orderItem) {
          return {
            ...book,
            quantity: Math.max(0, book.quantity - orderItem.cartQuantity),
          };
        }
        return book;
      });

      setBooks(updatedBooks);
      setCartItems([]);
      setShowCheckout(false);

      // Show success message with service details
      const rentItems = orderItems.filter((item) => item.service === "rent");
      const buyItems = orderItems.filter((item) => item.service === "sell");

      let message = "Order placed successfully! 🎉\n\n";

      if (rentItems.length > 0) {
        message += `📚 Rental Books (${rentItems.length}):\n`;
        rentItems.forEach((item) => {
          message += `• ${item.name} - ${item.rentDuration}\n`;
        });
        message += "Please return within the specified duration.\n\n";
      }

      if (buyItems.length > 0) {
        message += `🛍️ Purchased Books (${buyItems.length}):\n`;
        buyItems.forEach((item) => {
          message += `• ${item.name}\n`;
        });
        message += "These books are now yours to keep!\n\n";
      }

      message += `💰 Total Amount: ₹${total}\n`;
      message += "📧 You will receive a confirmation email soon.";

      alert(message);
    } catch (error) {
      alert("Error placing order. Please try again.");
      console.error("Order submission error:", error);
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.cartQuantity, 0);

  return (
    <div className="App">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setShowCart(true)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {currentPage === "home" && <Home onPageChange={setCurrentPage} />}
      {currentPage === "books" && (
        <Books books={books} onAddToCart={addToCart} />
      )}
      {currentPage === "contact" && <Contact />}

      {showCart && (
        <Cart
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
          onClose={() => setShowCart(false)}
        />
      )}

      {showCheckout && (
        <Checkout
          cartItems={cartItems}
          onBack={() => {
            setShowCheckout(false);
            setShowCart(true);
          }}
          onSubmit={handleOrderSubmit}
        />
      )}

      <Footer />
    </div>
  );
};

export default App;
