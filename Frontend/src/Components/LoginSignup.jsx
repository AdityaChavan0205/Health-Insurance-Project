import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "./redux/slices/authSlices";
import OtpVerification from "./OtpVerification";
import { MdClose } from "react-icons/md";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

const LoginSignup = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginEmail, setLoginEmail] = useState(""); // Separate email state for login
  const [errors, setErrors] = useState({});
  const [forgotPassword, setForgotPassword] = useState(false); // For Forgot Password Popup
  const dispatch = useDispatch();
  const { error, isLoading, userId, otpVerified } = useSelector(
    (state) => state.auth
  );

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!isLogin) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required.";
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required.";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginInputChange = (e) => {
    setLoginEmail(e.target.value); // Update only the login email
  };

  const handleSignup = () => {
    if (validateForm()) {
      dispatch(signup(formData));
    }
  };

  const handleLogin = () => {
    if (validateForm()) {
      dispatch(login({ ...formData, email: loginEmail })); // Use loginEmail for login
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password functionality
    setForgotPassword(true); // Show the forgot password popup
  };

  const handleCloseForgotPassword = () => {
    setForgotPassword(false); // Close the forgot password popup
  };

  if (userId && !otpVerified) {
    return <OtpVerification userId={userId} />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4">
      <div className="relative bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <MdClose size={24} />
        </button>

        <div className="flex justify-between items-center border border-gray-300 rounded-lg overflow-hidden mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-center text-sm font-semibold transition ${
              isLogin ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-center text-sm font-semibold transition ${
              !isLogin ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            Signup
          </button>
        </div>

        <form className="space-y-3">
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <FaUser className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-10 py-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 text-sm"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <FaUser className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-10 py-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 text-sm"
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>
            </>
          )}
          <div>
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={isLogin ? loginEmail : formData.email} // Separate email for login and signup
                onChange={isLogin ? handleLoginInputChange : handleInputChange} // Use different handlers for login and signup
                className="w-full px-10 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 text-sm"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-10 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 text-sm"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          {!isLogin && (
            <div>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-10 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 text-sm"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}
          <button
            type="button"
            onClick={isLogin ? handleLogin : handleSignup}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        {/* Forgot Password Link */}
        {isLogin && (
          <div className="text-center mt-4">
            <button
              onClick={handleForgotPassword}
              className="text-blue-500 hover:text-blue-700"
            >
              Forgot Password?
            </button>
          </div>
        )}
      </div>

      {/* Forgot Password Popup */}
      {forgotPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4">
          <div className="relative bg-white shadow-lg rounded-lg p-6 w-full max-w-xs">
            <button
              onClick={handleCloseForgotPassword}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <MdClose size={24} />
            </button>
            <h3 className="text-xl font-semibold text-center mb-4">
              Reset Password
            </h3>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-1.5 border border-gray-300 rounded-lg mb-4 text-sm"
            />
            <div className="flex justify-between">
              <button
                onClick={handleCloseForgotPassword}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {}}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
