// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../redux/Slices/authSlice";

// import LoginSignUp from "../Pages/LogInSingUp"; // Import your LoginSignUp component
// import { Menu, X } from "lucide-react";
// import { FaTimes } from "react-icons/fa";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth.formData);
//   const isLoggedIn = !!token;

//   const handleAuthClick = () => {
//     if (isLoggedIn) {
//       dispatch(logout());
//       alert("You have successfully logged out.");
//       navigate("/");
//     } else {
//       setShowAuthModal(true);
//     }
//   };

//   const closeModal = () => {
//     setShowAuthModal(false);
//   };

//   return (
//     <header className="bg-blue-200 shadow-md w-full relative">
//       <div className="container mx-auto flex items-center justify-between py-0 px-2">
//         <div className="flex items-center space-x-2">
//           <img src="/src/Components/assets/hi.jpg" alt="Website Logo" className="h-10 w-10" />
//           <div>
//             <h1 className="text-xl font-bold text-gray-800">
//               <span className="text-green-800">Health</span>{" "}
//               <span className="text-green-800">Life</span>{" "}
//               <span className="text-green-800">Insurance</span>
//             </h1>
//             <p className="text-sm text-gray-500 italic">"Your Health, Our Priority!"</p>
//           </div>
//         </div>

//         <div className="lg:hidden">
//           <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-expanded={isMenuOpen} className="p-2">
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         <nav
//           className={`lg:flex lg:items-center lg:space-x-6 text-gray-700 text-base font-medium ${isMenuOpen ? "block" : "hidden"
//             } lg:block absolute lg:relative top-full left-0 right-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none px-4 py-2 lg:p-0 z-50`}
//         >
//           <ul className="flex flex-col lg:flex-row lg:space-x-4 space-y-2 lg:space-y-0 lg:items-center">
//             <li className="hover:bg-gray-100 lg:hover:bg-transparent px-3 py-2 rounded transition-colors">
//               <NavLink to="/" className={({ isActive }) => ` ${isActive ? 'text-blue-600 font-bold' : ''}`}>
//                 Home
//               </NavLink>
//             </li>
//             <li className="hover:bg-gray-100 lg:hover:bg-transparent px-3 py-2 rounded transition-colors">
//               <NavLink to="/about" className={({ isActive }) => ` ${isActive ? 'text-blue-600 font-bold' : ''}`}>
//                 About Us
//               </NavLink>
//             </li>
//             <li className="w-full lg:w-auto hover:bg-gray-100 lg:hover:bg-transparent px-3 py-2 rounded transition-colors">
//               <Claim />
//             </li>
//             <li className="w-full lg:w-auto hover:bg-gray-100 lg:hover:bg-transparent px-3 py-2 rounded transition-colors">
//               <Support />
//             </li>
//             <li className="mt-2 lg:mt-0">
//               {isLoggedIn ? (
//                 <button
//                   onClick={handleAuthClick}
//                   className="group relative flex items-center justify-center px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium transition-transform duration-300 ease-in-out transform hover:scale-105"
//                 >
//                   <span className="absolute left-0 top-0 h-full w-1 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
//                   <span className="relative flex items-center">
//                     <img src="https://www.iconpacks.net/icons/1/free-user-logout-icon-304-thumb.png" alt="Logout Icon" className="w-5 h-5 mr-2" />
//                     <span>Logout</span>
//                   </span>
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleAuthClick}
//                   className="group relative flex items-center justify-center px-2 py-1 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium transition-transform duration-300 ease-in-out transform hover:scale-105"
//                 >
//                   <span className="absolute left-0 top-0 h-full w-1 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
//                   <span className="relative flex items-center">
//                     <img src="https://www.iconpacks.net/icons/1/free-user-login-icon-305-thumb.png" alt="Login Icon" className="w-5 h-5 mr-2" />
//                     <span>Login</span>
//                   </span>
//                 </button>
//               )}
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Login/Signup Modal */}
//       {showAuthModal && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//           <div className=" p-6 w-full max-w-md relative"> {/* Added relative here */}
//             {/* <button onClick={closeModal} className="absolute top-10 right-2 text-gray-500 hover:text-gray-700"> */}
//             {/* <FaTimes size={20} /> Use FaTimes for consistency */}
//             {/* </button> */}
//             <LoginSignUp onClose={closeModal} />
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Slices/authSlice";
import { Menu, X } from "lucide-react";
import Claim from "../Pages/Claim";
import Support from "../Pages/Support";
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
    <header className="shadow-md w-full top-0 left-0 z-50 bg-sky-100 fixed ">
      <div className="container mx-auto flex items-center justify-between -my-3 ">

        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src="/public/logo1.png"
            alt="Website Logo"
            className="h-36 w-32 pt-3 sm:h-20 sm:w-20 md:h-24 md:w-24"
          />
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">
              <span className="text-green-800">Health</span>
              <span className="text-green-800 pl-1">Life</span>
              <span className="text-green-800 pl-1">Insurance</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 italic">
              "Your Health, Our Priority!"
            </p>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className={`lg:flex lg:items-center lg:space-x-6 text-gray-700 font-medium text-[15px] absolute lg:relative top-full left-0 right-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none px-4 py-1 lg:p-0 z-50 mr-8 transition-all duration-300 ease-in-out ${isMenuOpen ? "block" : "hidden"
          }`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0 text-center lg:text-left">
            <li>
              <Link to="/" className="hover:text-green-700 transition-colors lg:text-[16px] block py-1 lg:py-0">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-700 transition-colors lg:text-[16px]  block py-1 lg:py-0">
                AboutUs
              </Link>
            </li>
            <li>
              <Link to="/claim" className="hover:text-green-700 transition-colors lg:text-[16px] block py-1 lg:py-0">
                <Claim />
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-green-700 transition-colors lg:text-[16px] block py-1 lg:py-0">
                <Support />
              </Link>
            </li>
          </ul>

          {/* Login / Logout Button */}
          <div className="mt-4  pl-8 lg:mt-0 flex justify-center lg:justify-start">
            <button
              onClick={handleAuthClick}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-800 text-white px-5 py-2 rounded-lg shadow-md hover:scale-105 transition-all"
            >
              <span className="text-[15px] font-semibold">
                {isLoggedIn ? "Logout" : "Login"}
              </span>
              <img
                src={isLoggedIn ? "https://www.iconpacks.net/icons/1/free-user-logout-icon-304-thumb.png" : "https://www.iconpacks.net/icons/1/free-user-login-icon-305-thumb.png"}
                alt="Auth Icon"
                className="w-5 h-5"
              />
            </button>
          </div>
        </nav>

      </div>
    </header>
  );
};

export default Navbar;