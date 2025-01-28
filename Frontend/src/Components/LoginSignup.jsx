import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "./redux/slices/authSlices";
import OtpVerification from "./OtpVerification";

const LoginSignup = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { error, isLoading, userId, otpVerified } = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    dispatch(signup(formData));
  };

  const handleLogin = () => {
    dispatch(login(formData));
  };

  if (userId && !otpVerified) {
    return <OtpVerification userId={userId} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 md:w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-gray-600"
        >
          ×
        </button>

        {/* Toggle buttons for Login and Signup */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-full py-2 text-center text-sm font-semibold rounded-l-lg ${isLogin ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-full py-2 text-center text-sm font-semibold rounded-r-lg ${!isLogin ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Signup
          </button>
        </div>

        <h2 className="text-center text-xl font-bold mb-4">
          {isLogin ? "Login" : "Signup"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Conditional rendering of Login or Signup form */}
        {isLogin ? (
          // Login Form
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              onClick={handleLogin}
              className="bg-purple-600 text-white py-2 px-4 w-full rounded mb-3 text-sm hover:bg-purple-700 transition"
            >
              Login
            </button>

            <p className="text-center text-blue-500 text-sm cursor-pointer">
              Forgot Password?
            </p>
          </div>
        ) : (
          // Signup Form
          <div>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleInputChange}
                className="w-1/2 p-2 border border-gray-300 rounded mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleInputChange}
                className="w-1/2 p-2 border border-gray-300 rounded mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              onClick={handleSignup}
              className="bg-purple-600 text-white py-2 px-4 w-full rounded mb-3 text-sm hover:bg-purple-700 transition"
            >
              Signup
            </button>
          </div>
        )}

        <p
          onClick={onClose}
          className="text-center text-blue-500 text-sm cursor-pointer mt-4"
        >
          Close
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
