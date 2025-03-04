import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* About Us */}
          <div className="md:w-1/4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-gray-400 mt-2">
              Providing top-tier medical insurance solutions, our company focuses
              on affordable, comprehensive coverage for individuals and families,
              prioritizing health and security.
            </p>
          </div>

          {/* Services */}
          <div className="md:w-1/4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="mt-3 space-y-2">
              <li className="text-gray-400">Individual Coverage</li>
              <li className="text-gray-400">Family Protection</li>
              <li className="text-gray-400">Emergency Assistance</li>
              <li className="text-gray-400">Preventive Care</li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="md:w-1/4">
            <h3 className="text-lg font-semibold">Contacts</h3>
            <p className="text-gray-400 mt-2">+91-22401-78571</p>
            <p className="text-gray-400">support@healthlifen.com</p>
            <p className="text-gray-400">123 Health Street, Wellness City</p>
          </div>

          {/* Business Hours */}
          <div className="md:w-1/4">
            <h3 className="text-lg font-semibold">Business Hours</h3>
            <p className="text-gray-400 mt-2">Mon - Fri: 8:00 AM - 6:00 PM</p>
            <p className="text-gray-400">Saturday: 9:00 AM - 4:00 PM</p>
            <p className="text-gray-400">Sunday: Closed</p>
          </div>
        </div>

        {/* Payment Methods & Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-gray-500 mt-8">
          {/* Payment Methods */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-lg font-semibold mb-3">Payment Methods</p>
            <ul className="flex space-x-4">
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
          {/* 
          Divider
          <div className="hidden md:block w-px h-12 bg-gray-400 mr-0"></div> */}

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-end">
            <p className="text-lg font-semibold mb-3">Follow Us</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaTwitter />
              </a>    
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-6 flex items-center justify-center px-6">
          <p className="text-gray-500 text-sm text-center">
            © 2025 MedInsure. All Rights Reserved. Your Trusted Health Insurance
            Partner
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;