import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../redux/Slices/authSlice"; // Adjust path if needed
import { toast, ToastContainer } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom"; // ✅ Import useParams & useNavigate
import 'react-toastify/dist/ReactToastify.css';
import { FaTimes } from "react-icons/fa";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams(); // ✅ Get resetToken from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, error } = useSelector((state) => state.auth);

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{8,16}$/;
    return re.test(password);
  };

  const handleClose = () => {
    navigate("/login"); // Navigate to the home page or any other desired page
  };

  const handleReset = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!validatePassword(newPassword)) {
      toast.error("Password must be 8-16 characters long and include at least one uppercase letter, one special character, and a combination of alphanumeric characters.");
      return;
    }

    if (!resetToken) {
      toast.error("Invalid or expired token. Please request a new reset link.");
      return;
    }

    dispatch(resetPassword({ resetToken, newPassword }))
      .unwrap()
      .then(() => {
        toast.success("Password reset successfully! Redirecting...");
        setTimeout(() => navigate("/login"), 2000); // ✅ Redirect after success
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative">
        <button onClick={handleClose} className="absolute -top-4 -right-4 text-white hover:text-gray-700 rounded-full transition-all p-2 bg-green-500 hover:bg-red-500 hover:text-white shadow-md">
          <FaTimes size={15} />
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Reset Password
        </h2>

        {/* New Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={8}
            maxLength={16}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={8}
            maxLength={16}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleReset}
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-green-500 w-full py-3 text-white rounded-lg transition-all duration-300 hover:from-green-500 hover:to-blue-500"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;