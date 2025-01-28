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
<<<<<<< HEAD
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
<<<<<<< HEAD
=======
=======

    <div>

      <div>

        <form action="">

          <input 
            type="text"
            placeholder="First Name"
          />
          <input 
            type="text"
            placeholder="Last Name"
          />
          
          <input 
            type="email"
            placeholder="Enter E-mail"
          />
          
          <input 
            type="password"
            placeholder="Enter Password"
          />


        </form>

      </div>

    </div>

  )
}
>>>>>>> 180851cedefaabd9befc26d93be9051dfa8c6836

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
>>>>>>> 8e9ef8f60000f3d19c61a386b402074c3acc15c8
      </div>
    </div>
  );
};

export default Login;
