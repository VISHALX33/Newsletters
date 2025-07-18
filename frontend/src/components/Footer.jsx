import React from 'react';

const Footer = () => (
  <footer className="border-t border-green-100 py-8 px-4 text-center bg-white mt-12">
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-center gap-6 mb-4">
        <a 
          href="#" 
          className="text-green-600 hover:text-green-800 hover:underline transition-colors duration-200"
        >
          Privacy Policy
        </a>
        <a 
          href="#" 
          className="text-green-600 hover:text-green-800 hover:underline transition-colors duration-200"
        >
          Terms of Service
        </a>
        <a 
          href="#" 
          className="text-green-600 hover:text-green-800 hover:underline transition-colors duration-200"
        >
          Contact Us
        </a>
      </div>
      <p className="text-green-700">
        &copy;2024 Tech Insights. All rights reserved.
      </p>
      <div className="mt-4 flex justify-center space-x-4">
        {/* Social icons would go here */}
        {/* Example:
        <a href="#" className="text-green-500 hover:text-green-700">
          <TwitterIcon className="h-5 w-5" />
        </a>
        */}
      </div>
    </div>
  </footer>
);

export default Footer;