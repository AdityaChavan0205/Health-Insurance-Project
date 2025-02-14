import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaTimes } from "react-icons/fa";
import { setFormData, login, signUp, verifyOtp, setOtp, resetError } from "../redux/Slices/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otpSent, otp, loading, userId, error } = useSelector(
    (state) => state.auth
  );

  const [isLogin, setIsLogin] = useState(true);
  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
  const [signUpFormData, setSignUpFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (loginFormData.token) {
      navigate("/dashboard");
    }
  }, [loginFormData.token, navigate]);

  useEffect(() => {
    if (!isLogin) {
      setOtpInputs(["", "", "", "", "", ""]);
    }
  }, [isLogin]);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    dispatch(resetError());
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return re.test(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateEmail(loginFormData.email)) {
      toast.error("Invalid email format. Only gmail.com and yahoo.com are allowed.");
      return;
    }
    if (!validatePassword(loginFormData.password)) {
      toast.error("Password must be at least 8 characters long and include at least one uppercase letter, one special character, and a combination of alphanumeric characters.");
      return;
    }
    dispatch(login(loginFormData)).then((response) => {
      if (response.payload && response.payload.token) {
        navigate("/dashboard");
      } else {
        toast.error(" Login failed. Please check your email and password.");
      }
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!/^[a-zA-Z]{1,20}$/.test(signUpFormData.firstName)) {
      toast.error("Invalid First Name must be alphabets only.");
      return;
    }
    if (!/^[a-zA-Z]{1,20}$/.test(signUpFormData.lastName)) {
      toast.error("Invalid Last Name must be alphabets only.");
      return;
    }
    if (!validateEmail(signUpFormData.email)) {
      toast.error("Invalid email format. Only gmail.com and yahoo.com are allowed.");
      return;
    }
    if (!validatePassword(signUpFormData.password)) {
      toast.error("Password must be at least 8 characters and include at least one uppercase, special character, and a combination of alphanumeric characters.");
      return;
    }
    if (signUpFormData.password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    dispatch(signUp(signUpFormData)).then((response) => {
      if (response.payload && response.payload.success) {
        toast.success(" Signup successful! Please verify your OTP.");
        // Set otpSent to true to switch to OTP verification tab
        dispatch(setOtp(""));
      } else {
        toast.error(" Signup failed. Please try again.");
      }
    });
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otpInputs.join("");
    if (enteredOtp.length !== 6) {
      toast.error(" Please enter the complete 6-digit OTP.");
      return;
    }
    try {
      const response = await dispatch(verifyOtp({ userId, otp: enteredOtp })).unwrap();
      if (response.success) {
        toast.success(" OTP verified successfully! Redirecting to login...");
        setTimeout(() => setIsLogin(true), 1000);
      } else {
        toast.error(" Invalid OTP. Please try again.");
      }
    } catch (err) {
      toast.error("⚠ Error verifying OTP. Please try again.");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(" Invalid OTP. Please check and try again.");
    }
  }, [error]);

  const handleOtpChange = (index, value) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return;
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;
    if (value && index < otpInputs.length - 1 && !otpInputs[index + 1]) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
    setOtpInputs(newOtpInputs);
    dispatch(setOtp(newOtpInputs.join("")));
  };

  const handleOtpPaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    const newOtpInputs = pasteData.split("");
    setOtpInputs(newOtpInputs);
    dispatch(setOtp(newOtpInputs.join("")));
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleClose = () => {
    navigate("/"); // Navigate to the home page or any other desired page
  };

  const renderInput = (type, value, onChange, placeholder, Icon, error, maxLength) => (
    <div className="mb-4 relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`border rounded-lg w-full p-3 pl-10 border-gray-300 focus:border-green-200 focus:ring-2 focus:ring-green focus:outline-none ${error ? "border-red-500" : ""}`}
        placeholder={placeholder}
        required
      />
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-md relative animate_animated animate_fadeIn">
        <button onClick={handleClose} className="absolute -top-4 -right-4 text-white rounded-full transition-all p-2 bg-green-500 hover:bg-red-500 hover:text-white shadow-md" >
          <FaTimes size={15} />
        </button>
        <div className="flex justify-between mb-6 space-x-2">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 text-center font-bold transition-all duration-300 ${isLogin ? "bg-blue-500 text-white rounded-lg hover:bg-blue-600" : "text-gray-500 hover:bg-gray-200"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 text-center font-bold transition-all duration-300 ${!isLogin ? "bg-blue-500 text-white rounded-lg hover:bg-blue-600" : "text-gray-500 hover:bg-gray-200"
              }`}
          >
            Signup
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={handleLogin}>
            {renderInput(
              "email",
              loginFormData.email,
              (e) => setLoginFormData({ ...loginFormData, email: e.target.value }),
              "Enter email",
              FaEnvelope,
              errors.email
            )}
            {renderInput(
              "password",
              loginFormData.password,
              (e) => setLoginFormData({ ...loginFormData, password: e.target.value }),
              "Enter password",
              FaLock,
              errors.password,
              8
            )}
            <div className="flex justify-end items-center mb-4">
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
              className="bg-gradient-to-r from-blue-500 to-green-500 w-full py-3 text-white rounded-lg transition-all duration-300 hover:from-green-500 hover:to-blue-500"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={otpSent ? handleVerifyOtp : handleSignUp}>
            {otpSent ? (
              <>
                <h2 className="text-center text-xl font-bold mb-4">Check your mail for the OTP</h2>
                <div className="mb-4 flex justify-between space-x-2">
                  {otpInputs.map((value, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      type="text"
                      maxLength="1"
                      value={value}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onPaste={handleOtpPaste}
                      className="border rounded-lg w-1/6 p-3 text-center"
                      placeholder="-"
                      required
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-blue-500 w-full py-3 text-white rounded-lg transition-all duration-300 hover:from-blue-500 hover:to-green-500"
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
                    signUpFormData.firstName,
                    (e) => setSignUpFormData({ ...signUpFormData, firstName: e.target.value }),
                    "First Name",
                    FaUser,
                    errors.firstName,
                    20
                  )}
                  {renderInput(
                    "text",
                    signUpFormData.lastName,
                    (e) => setSignUpFormData({ ...signUpFormData, lastName: e.target.value }),
                    "Last Name",
                    FaUser,
                    errors.lastName,
                    20
                  )}
                </div>
                {renderInput(
                  "email",
                  signUpFormData.email,
                  (e) => setSignUpFormData({ ...signUpFormData, email: e.target.value }),
                  "Enter Email",
                  FaEnvelope,
                  errors.email
                )}
                {renderInput(
                  "password",
                  signUpFormData.password,
                  (e) => setSignUpFormData({ ...signUpFormData, password: e.target.value }),
                  "Enter Password",
                  FaLock,
                  errors.password,
                  8
                )}
                {renderInput(
                  "password",
                  confirmPassword,
                  (e) => setConfirmPassword(e.target.value),
                  "Confirm Password",
                  FaLock,
                  errors.confirmPassword,
                  8
                )}
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-green-500 w-full py-3 text-white rounded-lg transition-all duration-300 hover:from-green-500 hover:to-blue-500"
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
