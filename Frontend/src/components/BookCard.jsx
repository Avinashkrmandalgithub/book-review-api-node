import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const BookCard = ({ book }) => {
  const fallbackImage = "https://images.unsplash.com/photo-1512820790803-83ca734da794";

  return (
    <Link
      to={`/books/${book._id}`}
      className="block transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden w-full sm:w-64 relative">
        <img
          src={book.image || fallbackImage}
          alt={book.title}
          className="w-full h-48 object-cover"
        />

        {book.rating && (
          <div className="absolute top-2 right-2 bg-teal-600 text-white text-sm px-2 py-1 rounded-md flex items-center">
            <Star size={14} className="mr-1 fill-current" />
            {book.rating.toFixed(1)}
          </div>
        )}

        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 truncate">
            {book.title}
          </h3>
          <p className="italic text-gray-500 dark:text-gray-400">{book.author}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">{book.genre}</p>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
