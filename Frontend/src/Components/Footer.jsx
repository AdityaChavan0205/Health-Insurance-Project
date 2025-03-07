import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-2 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mt-4">About Us</h3>
            <p className="text-gray-400 mt-2">
              Providing top-tier medical insurance solutions, our company
              focuses on affordable, comprehensive coverage for individuals and
              families, prioritizing health and security.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mt-4">Services</h3>
            <ul className="mt-3 space-y-2">
              <li className="text-gray-400">Individual Coverage</li>
              <li className="text-gray-400">Family Protection</li>
              <li className="text-gray-400">Emergency Assistance</li>
              <li className="text-gray-400">Preventive Care</li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-lg font-semibold mt-4">Contacts</h3>
            <p className="text-gray-400 mt-2">+91-22401-78571</p>
            <p className="text-gray-400">support@healthlifen.com</p>
            <p className="text-gray-400">123 Health Street, Wellness City</p>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mt-4">Business Hours</h3>
            <p className="text-gray-400 mt-2">Mon - Fri: 8:00 AM - 6:00 PM</p>
            <p className="text-gray-400">Saturday: 9:00 AM - 4:00 PM</p>
            <p className="text-gray-400">Sunday: Closed</p>
          </div>
        </div>

        {/* Payment Methods & Social Media */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-gray-500 mt-2 pt-2 text-center md:text-left">
          {/* Payment Methods */}
          <div>
            <p className="text-lg font-semibold mb-2">Payment Methods</p>
            <ul className="flex justify-center md:justify-start space-x-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <li key={num}>
                 <img
                    src={`/${num}.jpeg`}
                    alt={`Payment Method ${num}`}
                    className="w-16 h-6"
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-end">
            <p className="text-lg font-semibold mb-2">Follow Us</p>
            <div className="flex space-x-4">
              <a href="/" className="text-gray-400 hover:text-white text-xl">
                <FaFacebookF />
              </a>
              <a href="/" className="text-gray-400 hover:text-white text-xl">
                <FaTwitter />
              </a>
              <a href="/" className="text-gray-400 hover:text-white text-xl">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-5 border-t border-gray-500 pt-2 flex items-center justify-center px-6 text-center">
          <p className="text-gray-500 text-sm py-1">
            © {new Date().getFullYear()} Health Life Insurance. All Rights
            Reserved. Your Trusted Health Insurance Partner
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;