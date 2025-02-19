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
      <button className="flex items-center text-gray-700 text-base font-medium  hover:text-blue-600">
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
            <li className="flex items-center px-4 py-3 text-sm border-b border-gray-200 hover:bg-blue-50 transition-colors">
              <Link to="/dashboard" className="flex items-center text-gray-700">
                <img
                  src="data:image/png;base64,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" // Colorful dashboard icon
                  alt="Dashboard Icon"
                  className="w-6 h-6 mr-3"
                />
                <span className="text-gray-800 font-medium">Dashboard</span>
              </Link>
            </li>

            {/* Policies Link */}
            <li className="flex items-center px-4 py-3 text-sm hover:bg-gray-100 hover:scale-105 transition-transform">
              <Link to="/policies" className="flex items-center text-gray-700">
                <img
                  src="data:image/png;base64,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" // Colorful policies icon
                  alt="Policies Icon"
                  className="w-6 h-6 mr-3"
                />
                <span className="text-gray-800 font-medium">Policies</span>
              </Link>
            </li>

            {/* Get Help Link */}
            <li className="flex items-center px-4 py-3 text-sm hover:bg-gray-100 hover:scale-105 transition-transform">
              <Link to="/get-help" className="flex items-center text-gray-700">
              <img
  src="data:image/png;base64,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" // Example of an alternative icon
  alt="Get Help Icon"
  className="w-6 h-6 mr-3"
/>

                <span className="text-gray-800 font-medium">Get Help</span>
              </Link>
            </li>

            {/* Manage Communication Preferences Link */}
            <li className="flex items-center px-4 py-3 text-sm hover:bg-gray-100 hover:scale-105 transition-transform">
              <Link
                to="/manage-communication"
                className="flex items-center text-gray-700"
              >
                <img
src="https://cdn-icons-png.flaticon.com/512/9662/9662466.png"
alt="Communication Icon"
                  className="w-6 h-6 mr-3"
                />
                <span className="text-gray-800 font-medium">
                  Manage Communication
                </span>
              </Link>
            </li>

            {/* Verify Your Advisor Link */}
            <li className="flex items-center px-4 py-3 text-sm hover:bg-gray-100 hover:scale-105 transition-transform">
              <Link to="/verify-advisor" className="flex items-center text-gray-700">
                <img
src="https://cdn-icons-png.flaticon.com/512/5463/5463116.png"
alt="Verify Icon"
                  className="w-6 h-6 mr-3"
                />
                <span className="text-gray-800 font-medium">Verify Advisor</span>
              </Link>
            </li>

            {/* Contact Us Link */}
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

export default Support;
