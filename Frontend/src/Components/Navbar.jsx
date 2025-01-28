<<<<<<< HEAD
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Slices/authSlice";
=======
<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom";
>>>>>>> 8e9ef8f60000f3d19c61a386b402074c3acc15c8
import Claim from "../Pages/Claim";
import Support from "../Pages/Support";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.formData);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Log out the user
      dispatch(logout());
      alert("You have successfully logged out.");
      navigate("/"); // Redirect to home page after logout
    } else {
      navigate("/login");
    }
  };

  // Update `isLoggedIn` state when token is present
  React.useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-0 px-6">
        {/* Left Side: Logo */}
        <div className="flex items-center space-x-4">
          <img
            src="/src/Components/assets/hi.jpg"
            alt="Website Logo"
            className="h-16 w-16"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              <span className="text-green-800">Health</span>{" "}
              <span className="text-green-800">Life</span>{" "}
              <span className="text-green-800">Insurance</span>
            </h1>
            <p className="text-sm text-gray-500 italic">
              "Your Health, Our Priority!"
            </p>
          </div>
        </div>

        {/* Right Side: Navigation Links */}
        <nav>
          <ul className="flex items-center space-x-6 text-gray-700 text-base font-medium">
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to="/about">About Us</Link>
            </li>
            {/* Custom Components (Claim and Support) */}
            <li>
              <Claim />
            </li>
            <li>
              <Support />
            </li>

            {/* Login/Logout Button */}
            <li>
              <button
                onClick={handleAuthClick}
                className="bg-cyan-800 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {isLoggedIn ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

=======
import React, { useState } from "react";
import LoginSignup from  "./LoginSignup"

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="bg-purple-600 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl font-bold">My App</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-white text-purple-600 py-2 px-4 rounded"
      >
        Login / Signup
      </button>
      {isModalOpen && <LoginSignup onClose={() => setIsModalOpen(false)} />}
    </nav>
  );
};

>>>>>>> 180851cedefaabd9befc26d93be9051dfa8c6836
export default Navbar;
