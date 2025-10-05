import { create } from "zustand";
import axios from "axios";

const api = axios.create({
  baseURL:  "http://localhost:3000/api",
});

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(atob(base64));
  } catch (err) {
    return null;
  }
}

export const useAuthStore = create((set, get) => {
  //  Check localStorage for token when store is initialized
  const token = localStorage.getItem("token");
  const user = token ? parseJwt(token) : null;

  return {
    user,
    token,
    loading: false,
    error: null,

    signup: async (name, email, password) => {
      set({ loading: true, error: null });
      try {
        const res = await api.post("/signup", { name, email, password });
        set({ loading: false });
        return res.data;
      } catch (err) {
        set({ loading: false, error: err.response?.data?.message || err.message });
      }
    },

    login: async (email, password) => {
      set({ loading: true, error: null });
      try {
        const res = await api.post("/login", { email, password });
        const token = res.data.token;
        const user = parseJwt(token);
        set({ user, token, loading: false });
        localStorage.setItem("token", token);
        return user;
      } catch (err) {
        set({ loading: false, error: err.response?.data?.message || err.message });
      }
    },

    logout: () => {
      set({ user: null, token: null });
      localStorage.removeItem("token");
    },
  };
});
