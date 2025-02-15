
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaKey } from "react-icons/fa";
import {
  setFormData,
  login,
  signUp,
  verifyOtp,
  setOtp,
  resetError,
} from "../redux/Slices/authSlice";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, otpSent, otp, loading, userId, error } = useSelector(
    (state) => state.auth
  );

  const [isLogin, setIsLogin] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]); // Example for 6 alphanumeric OTP characters

  useEffect(() => {
    if (formData.token) {
      navigate("/dashboard");
    }
  }, [formData.token, navigate]);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    dispatch(resetError());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(signUp(formData));
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    dispatch(verifyOtp({ userId, otp: otpInputs.join("") }));
  };

  useEffect(() => {
    if (otpSent && !loading && !error && formData.token) {
      // OTP verified successfully, switch to the login tab
      setIsLogin(true);
      dispatch(resetError()); // Optionally reset error state
    }
  }, [otpSent, loading, error, formData.token, dispatch]);

  const handleOtpChange = (index, value) => {
    if (/[^a-zA-Z0-9]/.test(value)) return; // Only allow alphanumeric characters (letters and numbers)

    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;

    // Focus on the next input field if the current one is filled
    if (value !== "" && index < otpInputs.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    setOtpInputs(newOtpInputs);
    dispatch(setOtp(newOtpInputs.join("")));
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const renderInput = (type, value, onChange, placeholder, Icon) => (
    <div className="mb-4 relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border rounded-lg w-full p-3 pl-10"
        placeholder={placeholder}
        required
      />
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 max-w-md">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 text-center font-bold ${
              isLogin ? "bg-blue-500 text-white rounded-lg" : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 text-center font-bold ${
              !isLogin ? "bg-blue-500 text-white rounded-lg" : "text-gray-500"
            }`}
          >
            Signup
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={handleLogin}>
            {renderInput(
              "email",
              formData.email,
              (e) => dispatch(setFormData({ email: e.target.value })),
              "Enter email",
              FaEnvelope
            )}
            {renderInput(
              "password",
              formData.password,
              (e) => dispatch(setFormData({ password: e.target.value })),
              "Enter password",
              FaLock
            )}
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="bg-blue-500 w-full py-3 text-white rounded-lg"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={otpSent ? handleVerifyOtp : handleSignUp}>
            {otpSent ? (
              <>
                <div className="mb-4 flex justify-between space-x-2">
                  {otpInputs.map((value, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      type="text"
                      maxLength="1"
                      value={value}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="border rounded-lg w-1/6 p-3 text-center"
                      placeholder="-"
                      required
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  className="bg-green-500 w-full py-3 text-white rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </>
            ) : (
              <>
                <div className="flex gap-2 mb-2">
                  {renderInput(
                    "text",
                    formData.firstName,
                    (e) =>
                      dispatch(setFormData({ firstName: e.target.value })),
                    "First Name",
                    FaUser
                  )}
                  {renderInput(
                    "text",
                    formData.lastName,
                    (e) => dispatch(setFormData({ lastName: e.target.value })),
                    "Last Name",
                    FaUser
                  )}
                </div>
                {renderInput(
                  "email",
                  formData.email,
                  (e) => dispatch(setFormData({ email: e.target.value })),
                  "Enter Email",
                  FaEnvelope
                )}
                {renderInput(
                  "password",
                  formData.password,
                  (e) => dispatch(setFormData({ password: e.target.value })),
                  "Enter Password",
                  FaLock
                )}
                <div className="mb-4 relative">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border rounded-lg w-full p-3 pl-10"
                    placeholder="Confirm Password"
                    required
                  />
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                <div className="text-center">
                  {error && <div className="text-red-500 mb-4">{error}</div>}
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 w-full py-3 text-white rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;
