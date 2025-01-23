import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing

const Support = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setDropdownOpen(true)} // Open dropdown on hover
      onMouseLeave={() => setDropdownOpen(false)} // Close dropdown when mouse leaves
    >
      {/* Support Button with extra padding for wider hover area */}
      <button className="flex items-center text-gray-700 text-base font-medium  py-6 hover:text-blue-600">
        Support
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
        <div className="absolute right-0 mt-0 w-64 bg-white rounded-md shadow-lg z-50">
          <ul className="py-2">
            <li className="px-4 py-2 text-sm font-medium text-blue-600">
              My Account
            </li>

            {/* Dashboard Link */}
            <li className="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
  <Link
    to="/dashboard" // Add your route path here
    className="flex items-center text-gray-700"
  >
    <img
      src="https://cdn-icons-png.freepik.com/256/13905/13905545.png?ga=GA1.1.1293745059.1737366729&semt=ais_hybrid" // Image URL
      alt="Dashboard Icon" // Alternative text for accessibility
      className="w-5 h-5 mr-3" // Apply same width and height as the original icon
    />
    Dashboard
  </Link>
</li>

            {/* Policies Link */}
            
            <li className="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
  <Link
    to="/policies" // Add your route path here
    className="flex items-center text-gray-700"
  >
    <img
      src="https://cdn-icons-png.freepik.com/256/1833/1833835.png?semt=ais_hybrid" // Image URL
      alt="Policies Icon" // Alternative text for accessibility
      className="w-5 h-5 mr-3" // Apply same width and height as the original icon
    />
    Policies  
  </Link>
</li>

            {/* Get Help Link */}
            <li className="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
              <Link
                to="/get-help" // Add your route path here
                className="flex items-center text-gray-700"
              >
                <svg
                  className="w-5 h-5 mr-3 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 15h8m-4-4h0m0 4a4 4 0 110-8 4 4 0 010 8z"
                  />
                </svg>
                Get Help
              </Link>
            </li>

            {/* Manage Communication Preferences Link */}
            <li className="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
              <Link
                to="/manage-communication" // Add your route path here
                className="flex items-center text-gray-700"
              >
                <svg
                  className="w-5 h-5 mr-3 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Manage Communication Preferences
              </Link>
            </li>

            {/* Verify Your Advisor Link */}
            <li className="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
              <Link
                to="/verify-advisor" // Add your route path here
                className="flex items-center text-gray-700"
              >
                <svg
                  className="w-5 h-5 mr-3 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 17l-4 4m0 0l-4-4m4 4V3"
                  />
                </svg>
                Verify Your Advisor
              </Link>
            </li>

            {/* Contact Us Link */}
            <li className="px-4 py-2 text-sm text-blue-600 hover:underline">
              <Link
                to="/contact-us" // Add your route path here
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Support;
 