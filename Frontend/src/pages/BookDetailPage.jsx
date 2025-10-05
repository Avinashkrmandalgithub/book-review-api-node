import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useBooksStore } from "../store/useBooksStore.js";
import { useReviewsStore } from "../store/useReviewsStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import toast from "react-hot-toast";

const BookDetailPage = () => {
  const { id } = useParams(); // match the route param
  const user = useAuthStore((state) => state.user);

  const bookDetails = useBooksStore((state) => state.bookDetails);
  const fetchBookDetails = useBooksStore((state) => state.fetchBookDetails);
  const addReview = useReviewsStore((state) => state.addReview);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    if (id) fetchBookDetails(id);
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Login to submit a review.");

    try {
      await addReview(id, rating, review);
      toast.success("Review submitted!");
      setRating(0);
      setReview("");
      fetchBookDetails(id); // refresh reviews
    } catch (err) {
      toast.error("Failed to submit review.");
    }
  };

  if (!bookDetails) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <Link to="/" className="text-teal-600 dark:text-teal-400 hover:underline mb-6 inline-block font-medium">
        ← Back to Books
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 md:p-10 transition-all">
        {/* Book Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center">
            <img
              src={bookDetails.book.image}
              alt={bookDetails.book.title}
              className="w-64 sm:w-72 md:w-80 lg:w-96 h-auto object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-200"
            />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {bookDetails.book.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
              by <span className="font-medium">{bookDetails.book.author}</span>
            </p>
            <span className="inline-block bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-200 px-4 py-1 rounded-full text-sm font-medium mb-4">
              {bookDetails.book.genre}
            </span>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify mb-6">
              {bookDetails.book.description}
            </p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="my-12 border-t border-gray-200 dark:border-gray-700"></div>
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-8">
            Reviews
          </h2>

          {bookDetails.reviews?.data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {bookDetails.reviews.data.map((rev, i) => (
                <div key={i} className="p-5 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      {rev.user?.name || rev.user?.email}
                    </h3>
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          size={18}
                          color={j < rev.rating ? "#fbbf24" : "#ccc"}
                          fill={j < rev.rating ? "#fbbf24" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400 mb-10">No reviews yet. Be the first to review!</p>
          )}

          {user && (
            <form onSubmit={handleSubmitReview} className="border-t border-gray-200 dark:border-gray-700 pt-8 space-y-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Write a Review</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Rating:</label>
                <div className="flex space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={28}
                      onClick={() => setRating(i + 1)}
                      className="cursor-pointer transition-transform transform hover:scale-110"
                      color={i < rating ? "#fbbf24" : "#d1d5db"}
                      fill={i < rating ? "#fbbf24" : "none"}
                    />
                  ))}
                </div>
              </div>

              <textarea
                className="w-full p-3 border dark:border-gray-700 rounded-xl dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                rows="4"
                placeholder="Share your thoughts about this book..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              ></textarea>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-md font-medium transition-all duration-200"
                >
                  Submit Review
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

export default BookDetailPage;
