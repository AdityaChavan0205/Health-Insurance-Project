const express = require("express");
const app = express();

app.listen(3000, () => {
    console.log("server activated");
})

app.get("/", (req, res) => {
    res.send("Welcome to the Express server!");
});