import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <header className="flex justify-between items-center py-4 px-6 border-b border-green-100 bg-white shadow-sm sticky top-0 z-50">
      <div className="font-semibold text-lg flex items-center gap-2">
        <span className="text-green-600">📰</span>
        <Link 
          to="/" 
          className="text-green-700 font-bold hover:text-green-800 transition-colors duration-200"
        >
          Tech Insights
        </Link>
      </div>
      
      <nav className="flex gap-6 items-center">
        <Link
          to="/"
          className={`py-2 px-1 transition-colors duration-200 ${
            location.pathname === '/' 
              ? 'text-green-700 font-semibold border-b-2 border-green-600' 
              : 'text-green-600 hover:text-green-800'
          }`}
        >
          Home
        </Link>
        <Link
          to="/signup"
          className={`py-2 px-1 transition-colors duration-200 ${
            location.pathname === '/signup' 
              ? 'text-green-700 font-semibold border-b-2 border-green-600' 
              : 'text-green-600 hover:text-green-800'
          }`}
        >
          Signup
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;