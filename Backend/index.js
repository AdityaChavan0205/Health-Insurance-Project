const express = require("express");
const app = express();
<<<<<<< HEAD
const cors = require('cors');

// Define corsOptions
const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Allow cookies or authentication headers
};

app.use(cors(corsOptions)); // Use CORS with options
=======
const cors = require("cors");

// Enable CORS for all requests
const corsOptions = {
    origin: ["http://localhost:5173"], // Allowed frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Enable credentials (for cookies, etc.)
  };
  app.use(cors(corsOptions));
  
  
>>>>>>> 180851cedefaabd9befc26d93be9051dfa8c6836

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
const cookieParser = require("cookie-parser");
app.use(cookieParser()); // Parse cookies

// PORT
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Routes
const route = require("./Routes/authRoute");
app.use('/api/v1/', route);

// DB Connections
require("./Config/database").dbConnects();

app.listen(PORT, () => {
    console.log(`Server is listening at PORT NO: ${PORT}`);
});

// Default Admin
// require("./Controllers/adminController").initializeAdmin();

app.get('/', (req, res) => {
    res.send("<h1> THIS IS HOME PAGE... </h1>");
});