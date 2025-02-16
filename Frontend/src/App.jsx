import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "./redux/Store/store";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/AboutUs";
import Claim from "./Pages/Claim";
import Support from "./Pages/Support";
import Login from "./Pages/Login";
import Auth from "./Pages/Auth";
import SignUp from "./Pages/SignUp"; // Make sure SignUp is imported correctly
import LoginSignup from "./Pages/LogInSingUp";
import "./App.css"
import LoginSignUp from "./Pages/LogInSingUp";
import ForgotPassword from "./Pages/Forget";
import Reset from "./Pages/Reset";
const App = () => {
  return (
    <Provider store={store}> 
      <Router>
        <Navbar /> {/* Always visible */}
        <Routes>
          {/* {/* <Route path="/" element={<Home />} /> Default route */}
          <Route path="/about" element={<About />} />
          <Route path="/claim" element={<Claim />} />
          <Route path="/support" element={<Support />} />
          {/* <Route path="/login" element={<LoginSignup />} /> */}
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/signup" element={<SignUp />} />  
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/" element={<Reset/>} /> */}
          <Route path="/reset-password/:resetToken" element={<Reset />} />
          {/* <Route path="/expert" element={<Expert />} /> */}
          {/* <Route path="/auth" element={<Auth />} /> Signup/Login */}

        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
