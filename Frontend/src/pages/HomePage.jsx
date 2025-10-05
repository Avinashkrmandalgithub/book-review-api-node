import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard.jsx";
import GenreDropdown from "../components/GenreDropdown.jsx";
import { useBooksStore } from "../store/useBooksStore.js";

const HomePage = () => {
  const fetchBooks = useBooksStore((state) => state.fetchBooks);
  const books = useBooksStore((state) => state.books);
  const searchBooks = useBooksStore((state) => state.searchBooks);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (search) {
      searchBooks(search);
    } else {
      fetchBooks();
    }
  }, [search]);

  return (
    <div className="w-full">
      <div className="text-center py-12 px-4 sm:px-6 bg-gray-100 dark:bg-gray-800 transition-colors duration-300 rounded-lg animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-gray-100">
          Discover Your Next Great Read
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
          Browse our curated collection of books, share your thoughts, and connect with fellow readers.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 p-6 sm:p-8">
        <GenreDropdown />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or author..."
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 px-4 py-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring focus:ring-teal-200 dark:focus:ring-teal-700 transition-colors duration-300"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-8 pb-16">
        {books.length > 0 ? (
          books.map((book) => <BookCard key={book._id} book={book} />)
        ) : (
          <p className="text-gray-600 dark:text-gray-300 mt-4">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
