import { create } from "zustand";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const useBooksStore = create((set, get) => ({
  books: [],
  totalBooks: 0,
  bookDetails: null,
  loading: false,
  error: null,

  fetchBooks: async (page = 1, limit = 10) => {
    set({ loading: true });
    try {
      const res = await api.get("/books", { params: { page, limit } });
      const books = res.data.books.map(book => ({ ...book, id: book._id }));
      set({ books, totalBooks: res.data.total, loading: false });
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
    }
  },

  fetchBookDetails: async (bookId, page = 1, limit = 5) => {
    set({ loading: true });
    try {
      const res = await api.get(`/books/${bookId}`, { params: { page, limit } });
      set({ bookDetails: res.data, loading: false });
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
    }
  },

  addBook: async (book) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/books", book, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ loading: false });
      return res.data;
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
    }
  },

  searchBooks: async (q) => {
    set({ loading: true });
    try {
      const res = await api.get("/search", { params: { q } });
      const books = res.data.results.map(book => ({ ...book, id: book._id }));
      set({ books, loading: false });
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
    }
  },
}));
