import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFormData, login, resetError } from "../redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, loading, error } = useSelector((state) => state.auth);

  // Check for successful login and navigate to the dashboard
  useEffect(() => {
    if (formData.token) {
      navigate("/dashboard"); // Redirect when token is available
    }
  }, [formData.token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData)); // Trigger login action
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => dispatch(setFormData({ email: e.target.value }))}
              className="border rounded-lg w-full p-3"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={formData.password}
              onChange={(e) => dispatch(setFormData({ password: e.target.value }))}
              className="border rounded-lg w-full p-3"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full py-3 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
