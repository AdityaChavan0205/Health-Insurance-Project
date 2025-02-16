import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Claim = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      {/* Claim Button */}
      <button className="flex items-center text-gray-700 text-base font-medium py-6 hover:text-blue-600">
        Claim
        <svg
          className={`w-4 h-4 ml-1 transform ${
            dropdownOpen ? "rotate-180" : "rotate-0"
          } transition-transform duration-200`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-0 w-64 bg-white rounded-lg shadow-lg z-50">
          <ul className="py-2">
            <li className="px-4 py-3 text-sm font-medium text-blue-600 border-b border-gray-200">
              Claim Options
            </li>

            {/* File a New Claim */}
            <li className="flex items-center px-4 py-3 text-sm border-b border-gray-200 hover:bg-blue-50 transition-colors">
              <Link
                to="/file-claim"
                className="flex items-center text-gray-700 hover:text-blue-600 w-full"
              >
               
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17v-2a4 4 0 10-8 0v2m16 0v-2a4 4 0 10-8 0v2m4 5a2 2 0 110-4 2 2 0 014 4zm-9-5h10"
                  />
                
                File a New Claim
              </Link>
            </li>

            {/* View Filed Claims */}
            <li className="flex items-center px-4 py-3 text-sm border-b border-gray-200 hover:bg-blue-50 transition-colors">
              <Link
                to="/view-claims"
                className="flex items-center text-gray-700 hover:text-blue-600 w-full"
              >
               
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h11M9 21V3m0 0l-5 5m5-5l5 5"
                  />
                
                View Filed Claims
              </Link>
            </li>

            {/* Track a Claim */}
            <li className="flex items-center px-4 py-3 text-sm border-b border-gray-200 hover:bg-blue-50 transition-colors">
              <Link
                to="/track-claim"
                className="flex items-center text-gray-700 hover:text-blue-600 w-full"
              >
                
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 15h8m-4-4h0m0 4a4 4 0 110-8 4 4 0 010 8z"
                  />
                
                Track a Claim
              </Link>
            </li>

            {/* Claim FAQs */}
            <li className="flex items-center px-4 py-3 text-sm border-b border-gray-200 hover:bg-blue-50 transition-colors">
              <Link
                to="/claim-faqs"
                className="flex items-center text-gray-700 hover:text-blue-600 w-full"
              >
                
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                
                Claim FAQs
              </Link>
            </li>

            {/* Contact Us */}
            <li className="px-4 py-3 text-sm">
              <Link
                to="/contact-us"
                className="flex items-center justify-center text-blue-600 bg-blue-50 hover:bg-blue-100 hover:scale-105 hover:shadow-lg transition-transform duration-200 rounded-md py-2 px-4 w-full"
              >
                <svg
                  className="w-5 h-5 mr-2 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 9H5a2 2 0 01-2-2V8a2 2 0 012-2h14a2 2 0 012 2v7a2 2 0 01-2 2z"
                  />
                </svg>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Claim;
