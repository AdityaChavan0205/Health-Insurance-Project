import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Slices/authSlice";
import Claim from "../Pages/Claim";
import Support from "../Pages/Support";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.formData);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      dispatch(logout());
      alert("You have successfully logged out.");
      navigate("/");  
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  return (
    <header className="bg-white shadow-md w-full relative">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-4">
          <img src="/src/Components/assets/hi.jpg" alt="Website Logo" className="h-12 w-12" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              <span className="text-green-800">Health</span> <span className="text-green-800">Life</span> <span className="text-green-800">Insurance</span>
            </h1>
            <p className="text-sm text-gray-500 italic">"Your Health, Our Priority!"</p>
          </div>
        </div>
        
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
        <nav className={`lg:flex lg:items-center lg:space-x-6 text-gray-700 text-base font-medium ${
          isMenuOpen ? "block" : "hidden"
        } lg:block absolute lg:relative top-full left-0 right-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none px-4 py-2 lg:p-0 z-50`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-2 lg:space-y-0">
            <li className="hover:bg-gray-100 lg:hover:bg-transparent px-2 py-2 rounded">
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            </li>
            <li className="hover:bg-gray-100 lg:hover:bg-transparent px-2 py-2 rounded">
              <Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
            </li>
            <li className="w-full lg:w-auto hover:bg-gray-100 lg:hover:bg-transparent px-2 py-2 rounded">
              <Claim />
            </li>
            <li className="w-full lg:w-auto hover:bg-gray-100 lg:hover:bg-transparent px-2 py-2 rounded">
              <Support />
            </li>
            <li className="mt-2 lg:mt-0 hover:bg-gray-100 lg:hover:bg-transparent px-2 py-2 rounded">
              <button
                onClick={handleAuthClick}
                className="flex items-center justify-center space-x-2 bg-cyan-800 text-white w-full lg:w-auto px-4 py-2 rounded hover:bg-blue-700 transition-transform"
              >
                <img
                  src={isLoggedIn ? "https://www.iconpacks.net/icons/1/free-user-logout-icon-304-thumb.png" : "https://www.iconpacks.net/icons/1/free-user-login-icon-305-thumb.png"}
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