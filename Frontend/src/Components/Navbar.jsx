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

export default Navbar;
