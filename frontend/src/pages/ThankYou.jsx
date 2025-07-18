import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaEnvelope, FaHome, FaUserPlus } from 'react-icons/fa';

const ThankYou = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
    <Navbar />
    <main className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg max-w-2xl w-full text-center border border-green-100">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <FaCheckCircle className="text-5xl text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-700">
          Thank You for Subscribing!
        </h1>
        
        <p className="text-lg mb-4 text-gray-700">
          You've successfully joined our tech community.
        </p>
        
        <div className="flex items-center justify-center text-green-600 mb-6">
          <FaEnvelope className="mr-2" />
          <p>Check your email for updates and exclusive content.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <FaHome />
            Go to Home
          </Link>
          
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default ThankYou;