import React, { useState, useRef, useEffect } from "react";

const genres = ["All Genres", "Fiction", "Non-Fiction", "Romance"];

const GenreDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(genres[0]);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full sm:w-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-auto border border-gray-300 dark:border-gray-700 dark:bg-gray-800 bg-white dark:text-gray-200 text-gray-800 px-4 py-2 rounded-md text-left flex justify-between items-center focus:outline-none focus:ring focus:ring-teal-200 dark:focus:ring-teal-700 transition-colors duration-300"
      >
        <span>{selected}</span>
        <span
          className={`ml-2 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-50 w-full sm:w-auto max-h-60 overflow-auto border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md mt-1 shadow-lg">
          {genres.map((genre) => (
            <li
              key={genre}
              onClick={() => {
                setSelected(genre);
                setIsOpen(false);
              }}
              className="px-4 py-2 cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-teal-100 dark:hover:bg-teal-700 transition-colors duration-300"
            >
              {genre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GenreDropdown;
