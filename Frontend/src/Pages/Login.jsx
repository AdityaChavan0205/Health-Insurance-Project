import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error before trying again

    try {
      console.log("Sending login request..."); // Log to see if the request is sent
      const response = await axios.post("http://localhost:3000/api/v1/login/user", formData);

      console.log("Response: ", response.data); // Log the response from backend

      if (response.data.success) {
        alert("Login successful!");
        window.location.href = "/dashboard"; // Redirect to a dashboard or homepage
      } else {
        setError(response.data.msg || "Login failed!");
      }
    } catch (err) {
      console.error("Error during login:", err); // Log any error from the API
      setError(err.response?.data?.msg || "Error during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Login</h2>
        
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        
        <form onSubmit={handleLogin}>
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
