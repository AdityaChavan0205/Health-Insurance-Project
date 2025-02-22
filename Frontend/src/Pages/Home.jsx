import React from "react";
import { motion } from "framer-motion"; // ✅ Added missing import
import LoginSignUp from "../Pages/LogInSingUp";

function Home() {
  return (
   
    <>
       {/* <LoginSignUp /> */}
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between text-black min-h-screen bg-blue-100 px-6">
        {/* Left Side: Text Content */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left px-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-semibold tracking-widest uppercase">
            Secure Your Health
          </p>
          <h1 className="text-3xl md:text-4xl font-bold my-5 leading-tight">
            Protect Your Future
            <br />
            <span className="block text-3xl md:text-4xl font-bold text-red-600">
              with Health Life Insurance
            </span>
          </h1>
          <p className="text-lg my-4">
            Customized Health Insurance Plans for You and Your Family.
          </p>
          <motion.button
            className="bg-red-600 text-white px-6 py-2 mt-6 rounded-md font-medium hover:bg-red-700 transition transform hover:scale-95 cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            Explore Our Plans
          </motion.button>
        </motion.div>

        {/* Right Side: Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/HE4.png"
            alt="Health Insurance"
            className="w-[90%] md:w-[75%] h-auto max-w-sm md:max-w-md rounded-lg"
          />
        </motion.div>
      </div>

      {/* Plans Section */}
      <center>
        <h2 className="pt-8 text-3xl font-bold bg-gray-100">OUR PLANS</h2>
      </center>
      <div className="px-6 pt-12 pb-16 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Protection", img: "/Total_Protection.png", desc: "Wide-ranging plans covering all health aspects.", bg: "bg-red-200" },
            { title: "Family Coverage", img: "/Family_Coverage.png", desc: "Comprehensive coverage for you and your loved ones.", bg: "bg-orange-200" },
            { title: "Affordable Plans", img: "/Affordable_plans.png", desc: "Budget-friendly options for all income levels.", bg: "bg-pink-200" },
            { title: "Constant Support", img: "/Constant_Support.png", desc: "Round-the-clock support for all policy needs.", bg: "bg-green-200" },
          ].map((plan, index) => (
            <div key={index} className={`${plan.bg} shadow-md py-12 rounded-md text-center hover:shadow-xl hover:scale-105`}>
              <img src={plan.img} alt={plan.title} className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              <p>{plan.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between text-black min-h-screen bg-blue-100 px-6 pt-16 pb-12">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img src="/3rd3.jpg" alt="Health Insurance" className="w-full max-w-md h-auto object-contain rounded-lg shadow-lg" />
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full md:w-1/2 max-w-xl text-center md:text-left px-4">
          <p className="text-sm font-semibold tracking-widest uppercase">Secure Your Health</p>
          <h2 className="text-3xl md:text-4xl font-bold my-4">Protect Your Future with Health Life Insurance</h2>
          <p className="text-lg my-4">
            Our mission is to ensure that every individual and family receives the healthcare coverage they need. We strive to offer flexible and affordable insurance plans to meet the diverse needs of our clients.
          </p>
          <motion.button
            className="bg-red-600 text-white px-6 py-2 mt-4 rounded-md font-medium hover:bg-red-700 transition cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            Explore Our Plans
          </motion.button>
        </div>
      </div>

      {/* Contact Form Section */}
      <h2 className="text-3xl font-bold text-blue-900 pt-6 pl-6 bg-blue-100">Join Now: Secure Your Future with Insurance</h2>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-8 bg-blue-100">
        {/* Left Side - Form */}
        <motion.div
          className="w-full md:w-1/2 p-6 bg-white border border-gray-300 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl font-bold text-center mb-4">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name:</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email:</label>
              <input type="email" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Message:</label>
              <textarea rows="3" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400" />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              whileHover={{ scale: 1.05 }}
            >
              Submit
            </motion.button>
          </form>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/HomePage.png" alt="Insurance" className="w-80 h-auto rounded-lg" />
        </motion.div>
      </div>
    </>
  );
}

export default Home;
