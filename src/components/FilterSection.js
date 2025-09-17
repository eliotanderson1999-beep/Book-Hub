import React from "react";
import { Clock, ShoppingBag } from "lucide-react";

const FilterSection = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  genreFilter,
  setGenreFilter,
  sortBy,
  setSortBy,
  serviceFilter,
  setServiceFilter,
}) => {
  const categories = ["All", "Fiction", "Non-Fiction"];
  const genres = [
    "All",
    "Fantasy",
    "Mystery",
    "Self-Help",
    "Philosophy",
    "Biography",
    "Drama",
    "Romance",
    "Thriller",
    "Technical",
    "Collection",
    "Finance",
    "Dystopian",
  ];

  return (
    <div className="filter-section">
      <div className="service-tabs">
        <button
          onClick={() => setServiceFilter("all")}
          className={`service-tab ${serviceFilter === "all" ? "active" : ""}`}
        >
          All Books
        </button>
        <button
          onClick={() => setServiceFilter("rent")}
          className={`service-tab ${serviceFilter === "rent" ? "active" : ""}`}
        >
          <Clock size={16} style={{ marginRight: "0.5rem" }} />
          Rent Only
        </button>
        <button
          onClick={() => setServiceFilter("sell")}
          className={`service-tab ${serviceFilter === "sell" ? "active" : ""}`}
        >
          <ShoppingBag size={16} style={{ marginRight: "0.5rem" }} />
          Buy Only
        </button>
      </div>

      <div className="filter-row">
        <div>
          <input
            type="text"
            placeholder="Search books or authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="filter-select"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="filter-select"
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="name">Sort by Name</option>
          <option value="sellPrice">Sort by Sell Price</option>
          <option value="rentPrice">Sort by Rent Price</option>
          <option value="author">Sort by Author</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSection;
