import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFormData, setOtp, signUp, verifyOtp } from "../redux/Slices/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const { formData, otpSent, otp, loading, userId, error } = useSelector((state) => state.auth);

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the password and confirm password match
    if (formData.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Dispatch signUp action
    dispatch(signUp(formData));
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    dispatch(verifyOtp({ userId, otp }));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          {otpSent ? "Verify OTP" : "Sign Up"}
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {otpSent ? (
          <form onSubmit={handleVerifyOtp}>
            <input
              type="text"
              value={otp}
              onChange={(e) => dispatch(setOtp(e.target.value))}
              className="border rounded-lg w-full p-3"
              placeholder="Enter OTP"
              required
            />
            <button type="submit" className="bg-green-500 w-full py-3 mt-4">
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Form Inputs */}
            {["firstName", "lastName", "email", "password"].map((field) => (
              <div key={field} className="mb-4">
                <input
                  type={field === "password" ? "password" : "text"}
                  value={formData[field]}
                  onChange={(e) => dispatch(setFormData({ [field]: e.target.value }))}
                  className="border rounded-lg w-full p-3"
                  placeholder={`Enter ${field}`}
                  required
                />
              </div>
            ))}

            {/* Confirm Password Field */}
            <div className="mb-4">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border rounded-lg w-full p-3"
                placeholder="Confirm Password"
                required
              />
            </div>

            <button type="submit" className="bg-blue-500 w-full py-3">
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
