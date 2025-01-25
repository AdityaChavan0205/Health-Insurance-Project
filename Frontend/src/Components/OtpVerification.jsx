import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "./redux/slices/authSlices"

const OtpVerification = ({ userId }) => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      dispatch(verifyOtp({ userId, otp }));
    } else {
      alert("Please enter a valid 6-digit OTP.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-center text-2xl font-bold mb-4">Verify OTP</h2>
        {error && <p className="text-red-500">{error}</p>}
        <p className="text-center mb-4">
          An OTP has been sent to your registered email. Please enter it below to
          verify your account.
        </p>
        <input
          type="text"
          maxLength="6"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          className="w-full p-2 border rounded mb-4 text-center"
        />
        <button
          onClick={handleVerifyOtp}
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded ${
            isLoading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-purple-600 text-white"
          }`}
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
        <p className="text-center text-gray-600 mt-4">
          Didn't receive the OTP? <span className="text-blue-500 cursor-pointer">Resend OTP</span>
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
