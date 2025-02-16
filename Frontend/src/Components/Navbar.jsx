import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Slices/authSlice";
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
            {/* Home Link */}
            <li className="flex items-center space-x-2 group hover:scale-105 transition-transform">
            
              <Link
                to="/"
                className="group-hover:text-blue-600 transition-colors duration-300"
              >
                Home
              </Link>
            </li>

            {/* About Us Link */}
            <li className="flex items-center space-x-2 group hover:scale-105 transition-transform">
      
              <Link
                to="/about"
                className="group-hover:text-blue-600 transition-colors duration-300"
              >
                About Us
              </Link>
            </li>

            <li className="flex items-center space-x-2 hover:scale-105 transition-transform">
  {/* Icon for Claim */}
  {/* Claim Component */}
  <Claim />
</li>

            <li className="flex items-center space-x-2 hover:scale-105 transition-transform">
  {/* Icon for Support */}
  {/* Support Component */}
  <Support />
</li>


            {/* Login/Logout Button */}
            <li className="flex items-center space-x-2">
              <button
                onClick={handleAuthClick}
                className="flex items-center space-x-2 bg-cyan-800 text-white px-4 py-2 rounded hover:bg-blue-700 hover:scale-105 transition-transform"
              >
                <img
                  src={
                    isLoggedIn
                      ? "https://www.iconpacks.net/icons/1/free-user-logout-icon-304-thumb.png" // Colorful Logout Icon
                      : "https://www.iconpacks.net/icons/1/free-user-login-icon-305-thumb.png" // Colorful Login Icon
                  }
                  alt="Auth Icon"
                  className="w-6 h-6"
                />
                <span>{isLoggedIn ? "Logout" : "Login"}</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
