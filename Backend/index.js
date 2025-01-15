const express = require("express");
const app = express();

// Enable CORS for all requests
// const cors = require("cors");
// const corsOptions = {
//     origin: ["http://localhost:3000", "https://your-frontend-domain.com"], // Allowed origins
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
//     allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
//   };
  
//   // Use CORS with options
//   app.use(cors(corsOptions));
  

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
// const cookieParser = require("cookie-parser");
// app.use(cookieParser()); // Parse cookies

// PORT
require("dotenv").config();
const PORT = process.env.PORT || 4000

// Routes
const route = require("./Routes/authRoute");
app.use('/api/v1/', route);

// DB Connections
require("./Config/database").dbConnects();

app.listen(PORT, () => {
    console.log(`Server listen at PORT NO: ${PORT}`);
})

// Default Admin
// require("./Controllers/adminController").initializeAdmin();



app.get('/', (req,res) => {
    res.send(`<h1> THIS IS HOME PAGE... </h1>`)
})