import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post("http://localhost:3000/api/v1/signup/user", formData);
      if (response.data.success) {
        alert(response.data.msg);
        setOtpSent(true); // Proceed to OTP verification
        setUserId(response.data.userId);
      }
    } catch (error) {
      alert(error.response?.data?.msg || "Error during signup.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post("http://localhost:3000/api/v1/signup/user/verify-otp", {
        userId,
        otp,
      });
      if (response.data.success) {
        alert(response.data.msg);
        window.location.href = "/login"; // Redirect to login
      }
    } catch (error) {
      alert(error.response?.data?.msg || "Error during OTP verification.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          {otpSent ? "Verify OTP" : "Sign Up"}
        </h2>
        
        {loading && (
          <div className="text-center mb-4 text-blue-500">Processing...</div>
        )}

        {!otpSent ? (
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="border border-gray-300 rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="border border-gray-300 rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border border-gray-300 rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="border border-gray-300 rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-gray-300 rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white w-full py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
