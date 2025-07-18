import React from 'react';
import { FaNewspaper, FaChartLine, FaUsers, FaLeaf, FaRocket, FaLightbulb } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full flex justify-center py-16 px-4 bg-gradient-to-b from-green-50 to-white">
          <div className="max-w-5xl bg-cover bg-center rounded-xl p-8 md:p-12 text-center ">
            <h1 className="text-green-900 text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
              Stay Ahead in the Tech World
            </h1>
            <p className="text-green-600 text-lg mb-8 max-w-2xl mx-auto drop-shadow-md">
              Get the latest tech news, trends, and insights delivered straight to your inbox. Join thousands of smart readers who trust our newsletter to keep them informed and inspired.
            </p>
            <button 
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg"
              onClick={() => navigate('/signup')}
            >
              Subscribe Now
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto py-16 px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-700 mb-2">What You'll Get</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white border border-green-100 rounded-xl p-8 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaNewspaper className="text-2xl text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Daily News</h3>
              <p className="text-gray-600 text-center">
                Stay up-to-date with the latest tech news and developments.
              </p>
            </div>
            <div className="bg-white border border-green-100 rounded-xl p-8 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChartLine className="text-2xl text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Market Analysis</h3>
              <p className="text-gray-600 text-center">
                Gain insights into market trends and investment opportunities.
              </p>
            </div>
            <div className="bg-white border border-green-100 rounded-xl p-8 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-2xl text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Community Insights</h3>
              <p className="text-gray-600 text-center">
                Connect with a community of tech enthusiasts and professionals.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-green-700 mb-4">Exclusive Content</h3>
              <p className="text-gray-600 mb-6">
                Our newsletter provides in-depth analysis and unique perspectives on the tech industry,
                covering topics such as AI, cybersecurity, and emerging technologies.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaLeaf className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Weekly deep dives on trending technologies</span>
                </li>
                <li className="flex items-start">
                  <FaRocket className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Early access to our research reports</span>
                </li>
                <li className="flex items-start">
                  <FaLightbulb className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Exclusive interviews with industry leaders</span>
                </li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1470&q=80" 
                alt="Tech analysis" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-green-50 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-700 mb-2">Our Impact</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join thousands of professionals who rely on our insights to stay ahead in the tech industry
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-4xl font-bold text-green-600 mb-2">10,000+</h4>
                <p className="text-gray-500 mb-1">Subscribers</p>
                <p className="text-green-500 font-medium">+10% monthly growth</p>
              </div>
              <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-4xl font-bold text-green-600 mb-2">65%</h4>
                <p className="text-gray-500 mb-1">Average Open Rate</p>
                <p className="text-green-500 font-medium">Industry-leading engagement</p>
              </div>
              <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-4xl font-bold text-green-600 mb-2">AI in 2024</h4>
                <p className="text-gray-500 mb-1">Most Popular Issue</p>
                <p className="text-green-500 font-medium">Read by 5,000+ professionals</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-green-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Ready to Join Our Community?</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Subscribe to our newsletter and become part of a thriving community of tech enthusiasts and professionals.
            </p>
            <button 
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg"
              onClick={() => navigate('/signup')}
            >
              Get Started Now
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;