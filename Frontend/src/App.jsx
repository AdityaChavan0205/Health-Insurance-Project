// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/Store/store";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/AboutUs";
import Claim from "./Pages/Claim";
import Support from "./Pages/Support";



const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
 
        <Routes>
          {/* <Route path="/claim" element={<Claim />} />
          <Route path="/support" element={<Support />} /> */}
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;



