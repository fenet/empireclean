import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src="/logo.png" alt="EmpireClean" className="h-20 md:h-40 w-auto" />
        <span className="text-xl font-bold text-[#8d5a1b]">EmpireClean</span>
      </Link>

      {/* Nav Links */}
      <div className="space-x-6">
        <Link to="/" className="text-gray-700 hover:text-[#8d5a1b]">
          Home
        </Link>
        <Link to="/search/order" className="text-gray-700 hover:text-[#8d5a1b]">
          Book
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-[#8d5a1b]">
          About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

