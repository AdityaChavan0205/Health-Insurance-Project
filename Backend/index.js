const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log("server activated");
})

app.get("/" , (req,res) => {
    res.send(`<h1> This is Home/Default Page </h1>`)
})