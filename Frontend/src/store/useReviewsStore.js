import { create } from "zustand";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const useReviewsStore = create((set, get) => ({
  loading: false,
  error: null,

  addReview: async (bookId, rating, comment) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        `/books/${bookId}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    }
  },

  updateReview: async (reviewId, rating, comment) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.put(
        `/reviews/${reviewId}`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    }
  },

  deleteReview: async (reviewId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.delete(`/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    }
  },
}));
