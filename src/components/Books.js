import React, { useState } from "react";
import FilterSection from "./FilterSection";
import BookCard from "./BookCard";

const Books = ({ books, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [genreFilter, setGenreFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [serviceFilter, setServiceFilter] = useState("all");

  const filteredBooks = books
    .filter((book) => {
      const matchesSearch =
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || book.category === categoryFilter;
      const matchesGenre = genreFilter === "All" || book.genre === genreFilter;
      const matchesService =
        serviceFilter === "all" || book.availableFor.includes(serviceFilter);
      return matchesSearch && matchesCategory && matchesGenre && matchesService;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "sellPrice") return a.sellPrice - b.sellPrice;
      if (sortBy === "rentPrice") {
        const aRentPrice = a.rentOptions ? a.rentOptions["1week"].price : 0;
        const bRentPrice = b.rentOptions ? b.rentOptions["1week"].price : 0;
        return aRentPrice - bRentPrice;
      }
      if (sortBy === "author") return a.author.localeCompare(b.author);
      return 0;
    });

  return (
    <div className="page-container">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Our Book Collection
          </h2>
          <p style={{ fontSize: "1.2rem", color: "#666" }}>
            Choose from flexible rental periods or buy books for keeps!
          </p>
        </div>

        <FilterSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          genreFilter={genreFilter}
          setGenreFilter={setGenreFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          serviceFilter={serviceFilter}
          setServiceFilter={setServiceFilter}
        />

        <div className="books-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onAddToCart={onAddToCart} />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>
            <p>No books found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
