import React from 'react';
import SignupForm from '../components/SignupForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const SignupPage = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
    <Navbar />
    <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
      <Link 
        to="/" 
        className="mb-6 text-green-600 hover:text-green-800 transition-colors duration-200 flex items-center"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-1" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
            clipRule="evenodd" 
          />
        </svg>
        Back to Home
      </Link>
      <div className="w-full max-w-4xl">
        <SignupForm />
      </div>
    </main>
    <Footer />
  </div>
);

export default SignupPage;