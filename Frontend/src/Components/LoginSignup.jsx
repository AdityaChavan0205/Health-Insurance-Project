import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "./redux/slices/authSlices";
import OtpVerification from "./OtpVerification";
import { MdClose } from "react-icons/md";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

const LoginSignup = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginEmail, setLoginEmail] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { userId, otpVerified } = useSelector((state) => state.auth);

  const validateForm = () => {
    let newErrors = {};
    if (!isLogin) {
      if (!formData.firstName.trim()) newErrors.firstName = "First Name is required!";
      if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required!";
    }
    if (!isLogin || formData.email.trim() === "") newErrors.email = "Email is required!";
    if (formData.password.trim() === "") newErrors.password = "Password is required!";
    if (!isLogin && formData.confirmPassword.trim() === "") newErrors.confirmPassword = "Confirm Password is required!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleAuth = () => {
    if (!validateForm()) return;

    if (isLogin) {
      dispatch(login({ email: loginEmail, password: formData.password }));
    } else {
      dispatch(signup(formData));
    }
  };

  if (userId && !otpVerified) {
    return <OtpVerification userId={userId} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4"
    >
      <motion.div
        key={isLogin ? "login" : "signup"}
        className="relative bg-white shadow-2xl rounded-[20px] p-8 w-full max-w-md border border-gray-300"
      >
        <button
          onClick={onClose}
          className="absolute top-[-15px] right-[-15px] text-white bg-slate-800 border border-gray-300 hover:bg-red-600 hover:text-white rounded-full p-2 shadow-md transition-all">
          <MdClose size={14} />
        </button>

   
        {/* Login & Signup Toggle with Smooth Animatio   n */}
        <motion.div className="flex bg-gray-300 rounded-xl p-1 mb-6 relative">
          <motion.div
            layout
            className={`absolute top-0 bottom-0 w-1/2 bg-blue-600 rounded-[8px] transition-all ${
              isLogin ? "left-0" : "left-1/2"
            }`}
          />
          <button
            onClick={() => setIsLogin(true)}
            className="w-1/2 py-2 text-center text-sm font-semibold relative z-10 transition-all"
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className="w-1/2 py-2 text-center text-sm font-semibold relative z-10 transition-all"
          >
            Signup
          </button>
        </motion.div>

        {/* Form */}
        <form className="space-y-5">
          {/* First & Last Name (Side by Side) */}
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full pl-10 py-2 border rounded-lg focus:outline-none ${
                    errors.firstName ? "border-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                  }`}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full pl-10 py-2 border rounded-lg focus:outline-none ${
                    errors.lastName ? "border-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                  }`}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </motion.div>
          )}

          {/* Email Field */}
          <div className="relative mx-auto w-full max-w-md">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={isLogin ? loginEmail : formData.email}
              onChange={(e) => (isLogin ? setLoginEmail(e.target.value) : handleInputChange(e))}
              className={`w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="relative mx-auto w-full max-w-md">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password (Only in Signup) */}
          {!isLogin && (
            <div className="relative mx-auto w-full max-w-md">
              <FaLock className="absolute left-3 top-3 text-gray-500" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          {/* Login / Signup Button */}
          <motion.div className="flex justify-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleAuth}
              className="w-40 rounded-lg bg-blue-600 text-white py-2.5 transition-all"
            >
              {isLogin ? "Login" : "Signup"}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default LoginSignup;
