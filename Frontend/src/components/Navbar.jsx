import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Moon,
  Sun,
  Menu,
  X,
  LogIn,
  UserPlus,
  Search,
  PlusCircle,
  LogOut,
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    toast("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 dark:text-white shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-3xl">📚</span>
            <h1 className="text-2xl font-bold text-teal-800 dark:text-teal-400">
              BookNook
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search books..."
              className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-md px-3 py-1 w-64 focus:outline-none focus:ring focus:ring-teal-200 dark:focus:ring-teal-700 transition"
            />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Auth Links */}
            {user ? (
              <>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Welcome,{" "}
                  <span className="text-teal-600 dark:text-teal-400">
                    {user.name}
                  </span>
                </span>

                <button
                  onClick={() => handleNavigation("/add-book")}
                  className="flex items-center px-4 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition"
                >
                  <PlusCircle size={18} className="mr-1" /> Add Book
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-1 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <LogOut size={18} className="mr-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation("/signin")}
                  className={`px-4 py-1 border rounded-md flex items-center transition ${
                    isActive("/signin")
                      ? "border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400"
                      : "border-gray-300 dark:border-gray-700"
                  }`}
                >
                  <LogIn size={16} className="mr-1" /> Login
                </button>
                <button
                  onClick={() => handleNavigation("/signup")}
                  className={`px-4 py-1 rounded-md flex items-center transition ${
                    isActive("/signup")
                      ? "bg-teal-600 text-white hover:bg-teal-700"
                      : "bg-teal-700 text-white hover:bg-teal-800"
                  }`}
                >
                  <UserPlus size={16} className="mr-1" /> Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger + Theme */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition flex items-center justify-center"
            >
              {isOpen ? (
                <X size={24} className="text-red-500 dark:text-red-400" />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={toggleMenu}
          ></div>
          <div className="fixed top-16 left-0 right-0 px-4 pt-3 pb-4 space-y-2 bg-white dark:bg-gray-900 z-50">
            <div className="flex items-center space-x-2 mb-3">
              <Search size={20} className="text-gray-500 dark:text-gray-300" />
              <input
                type="text"
                placeholder="Search books..."
                className="flex-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-teal-200 dark:focus:ring-teal-700 transition"
              />
            </div>

            {user ? (
              <>
                <p className="text-gray-700 dark:text-gray-300 px-2">
                  Welcome,{" "}
                  <span className="text-teal-600 dark:text-teal-400 font-medium">
                    {user.name}
                  </span>
                </p>
                <button
                  onClick={() => handleNavigation("/add-book")}
                  className="w-full flex items-center justify-center px-4 py-2 rounded-md bg-teal-600 hover:bg-teal-700 text-white transition"
                >
                  <PlusCircle size={20} className="mr-2" /> Add Book
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <LogOut size={20} className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation("/signin")}
                  className={`w-full flex items-center px-4 py-2 rounded-md transition ${
                    isActive("/signin")
                      ? "bg-teal-600 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <LogIn size={20} className="mr-2" /> Login
                </button>
                <button
                  onClick={() => handleNavigation("/signup")}
                  className={`w-full flex items-center px-4 py-2 rounded-md transition ${
                    isActive("/signup")
                      ? "bg-teal-600 text-white"
                      : "bg-teal-700 text-white hover:bg-teal-800"
                  }`}
                >
                  <UserPlus size={20} className="mr-2" /> Sign Up
                </button>
              </>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
