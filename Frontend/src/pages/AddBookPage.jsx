import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { useBooksStore } from "../store/useBooksStore.js";
import toast from "react-hot-toast";

const AddBookPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const addBook = useBooksStore((state) => state.addBook);

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    image: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("You must be logged in to add a book.");

    try {
      await addBook(form);
      toast.success("Book added successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to add book.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          📘 Add a New Book
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {["title", "author", "genre"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)} *
              </label>
              <input
                id={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                placeholder={`Enter ${field}`}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
              placeholder="Write a short description about the book..."
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cover Image URL
            </label>
            <input
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/cover.jpg"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            {form.image && (
              <div className="mt-4 flex justify-center">
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-32 h-48 object-cover rounded-md border shadow-sm"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white text-lg font-medium rounded-lg shadow-md transition-all duration-200"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookPage;
