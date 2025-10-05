import React, { useState, useContext } from "react";
import { BookOpen } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import { useAuthStore } from "../../store/useAuthStore.js";
import toast from "react-hot-toast";

const SignInPage = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const login = useAuthStore((store) => store.login);

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await login(credentials.email, credentials.password);
      setLoading(false);
      if (user) {
        toast.success("Logged in successfully!");
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "Login failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-10 rounded-xl shadow-lg w-full max-w-md transition-colors duration-300">
        <div className="text-center mb-8">
          <BookOpen
            className="mx-auto h-12 w-12 text-teal-600"
            strokeWidth={1.5}
          />
          <h1 className="text-4xl font-serif text-gray-900 dark:text-gray-100 mt-4">
            BookNook
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Welcome back to your reading corner
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 outline-none transition-colors duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 outline-none transition-colors duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors duration-300"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-teal-600 dark:text-teal-400 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
