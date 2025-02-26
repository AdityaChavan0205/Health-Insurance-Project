import React from 'react';
import { motion } from "framer-motion";
import Footer from '../Components/Footer';


function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between text-black min-h-screen bg-blue-100 px-6 pt-30 ">
        {/* Left Side: Text Content */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left px-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
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
            Customized Health Insurance Plans for You and Your Family. Secure, flexible, and tailored coverage.
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
          className="w-full  md:w-1/2 flex justify-center md:mt-0 "
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <img
            src="\public\HE4.png"
            alt="Health Insurance"
            className="w-[90%] md:w-[75%] h-auto max-w-sm md:max-w-md rounded-lg "
          />
        </motion.div>
      </div>

      {/* Plans Section */}
      <center><h1 className="pt-8 text-3xl font-bold bg-gray-00">OUR PLANS</h1></center>
      <div className="px-6 pt-12 pb-16 bg-blue-00">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
          {/* First Card */}
          <div className="bg-red-00 bg-pink-200 shadow-md py-12 rounded-md text-center hover:shadow-xl hover:scale-105">
            <img
              src="\public\Total_Protection.png"  // Replace with your logo path
              alt="Logo"
              className="w-16 h-16 mx-auto mb-4"  // Adjust size as needed
            />
            <h1 className="text-xl font-bold mb-2">Total Protection</h1>
            <p>Wide-ranging plans covering all health aspects.</p>
          </div>

          {/* Second Card */}
          <div className="bg-orange-00 bg-blue-200 shadow-md py-10 rounded-md text-center hover:shadow-xl hover:scale-105 cursor-pointer">
            <img
              src="\public\Family_Coverage.png"  // Replace with your logo path
              alt="Logo"
              className="w-20 h-20 mx-auto mb-2"  // Adjust size as needed
            />
            <h1 className="text-xl font-bold mb-2">Family Coverage</h1>
            <p>Comprehensive coverage for you and your loved ones.</p>
          </div>

          {/* Third Card */}
          <div className="bg-pink-200 shadow-md py-14 rounded-md text-center hover:shadow-xl hover:scale-105 cursor-pointer">
            <img
              src="\public\Affordable_plans.png"  // Replace with your logo path
              alt="Logo"
              className="w-16 h-14 mx-auto mb-4"  // Adjust size as needed
            />
            <h1 className="text-xl font-bold mb-2">Affordable Plans</h1>
            <p>Budget-friendly options for all income levels.</p>
          </div>

          {/* Fourth Card */}
          <div className="bg-green-00 bg-blue-200 shadow-md py-12 rounded-md text-center hover:shadow-xl hover:scale-105 cursor-pointer">
            <img
              src="\public\Constant_Support.png"  // Replace with your logo path
              alt="Logo"
              className="w-16 h-16 mx-auto mb-4"  // Adjust size as needed
            />
            <h1 className="text-xl font-bold mb-2">Constant Support</h1>
            <p>Round-the-clock support for all policy needs.</p>
          </div>
        </div>
      </div>


      {/* 3rd section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between text-black min-h-screen bg-blue-100 px-6 pt-16 pb-12">
        {/* Right Side: Text Content */}
        <div className="w-full md:w-1/2 max-w-xl text-center md:text-left px-4">
          <p className="text-sm font-semibold tracking-widest uppercase">Secure Your Health</p>
          <h1 className="text-3xl md:text-4xl font-bold my-4">
            Protect Your Future
          </h1>
          <h1 className="text-3xl md:text-4xl font-bold">
            with Health Life Insurance
          </h1>
          <p className="text-lg my-4">
            Our mission is to ensure that every individual and family receives the healthcare coverage they need. We strive to offer flexible and affordable insurance plans to meet the diverse needs of our clients.
          </p>
          <button className="bg-red-600 text-white px-6 py-2 mt-4 rounded-md font-medium hover:bg-red-700 transition cursor-pointer">
            Explore Our Plans
          </button>
        </div>

        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="\public\3rd3.jpg" // Correcting image path
            alt="Health Insurance"
            className="w-full max-w-md h-auto object-contain rounded-lg shadow-lg"
          />
        </div>
      </div>


      {/* // Explore More Section */}
      <center><h1 className='pt-12 bg-gray-100 font-bold text-3xl'>Explore Our Diverse Insurance Options</h1></center>
      <div className='px-8 py-12 bg-gray-100'>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Box 1 */}
          <div className='shadow-md rounded-md py-16 text-center text-white bg-blue-800 hover:bg-red-600 hover:scale-105 cursor-pointer'>
            <h1 className='font-bold text-2xl'>Individual Health</h1>
            <h1 className='font-bold text-2xl'>  Insurance</h1>
            <p className='pt-6 px-2'>Comprehensive health coverage tailored for individuals.</p>
          </div>
          {/* Box 2 */}
          <div className='shadow-md rounded-md py-16 text-center text-white bg-blue-800 hover:bg-red-600 hover:scale-105 cursor-pointer'>
            <h1 className='font-bold text-2xl'>Maternity & Childcare Coverage</h1>
            <p className='pt-6 px-2'>Comprehensive care for expecting mothers and newborns.</p>
          </div>
          {/* Box 3 */}
          <div className='shadow-md rounded-md py-16 text-center text-white bg-blue-800 hover:bg-red-600 hover:scale-105 cursor-pointer'>
            <h1 className='font-bold text-2xl'>Hospitalization and Surgery Plans</h1>
            <p className='pt-6 px-2'>Financial security for medical emergencies and surgeries.</p>
          </div>
        </div>
      </div>


      {/* Contact Form Section */}
      <h1 className="text-3xl font-bold text-blue-900 pt-6 pl-6 bg-blue-100">
        Join Now: Secure Your Future with Insurance
      </h1>
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
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email:</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Message:</label>
              <textarea
                rows="3"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="button"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition transform hover:scale-100 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              Submit
            </button>
          </form>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/HomePage.png"
            alt="Insurance"
            className="w-80 h-auto rounded-lg"
          />
        </motion.div>
      </div>
      <Footer />
    </>
  )
}

export default Home;